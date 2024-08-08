import db from "../models";
import _ from "lodash";

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getTopDoctorHome = async (limitInput) => {
  try {
    let users = await db.Users.findAll({
      limit: limitInput,
      where: {
        roleId: "R2",
      },
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.AllCodes,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.AllCodes,
          as: "genderData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      nest: true,
      raw: true,
    });
    return {
      errCode: 0,
      message: "Get top doctor successfully!",
      data: users,
    };
  } catch (error) {
    console.log(error);
  }
};

let getAllDoctors = async () => {
  try {
    let doctors = await db.Users.findAll({
      where: {
        roleId: "R2",
      },
      attributes: {
        exclude: ["password", "image"],
      },
    });

    return {
      errCode: 0,
      message: "Get all doctor successfully!",
      data: doctors,
    };
  } catch (error) {
    console.log(error);
  }
};

let saveDetailInforDoctor = async (inputData) => {
  try {
    if (
      !inputData.doctorId ||
      !inputData.contentHTML ||
      !inputData.contentMarkdown ||
      !inputData.action
    ) {
      return {
        errCode: 1,
        message: "Missing required parameters...",
      };
    }

    if (inputData.action === "CREATE") {
      await db.Markdowns.create({
        contentHTML: inputData.contentHTML,
        contentMarkdown: inputData.contentMarkdown,
        description: inputData.description,
        doctorId: inputData.doctorId,
      });
    }

    if (inputData.action === "EDIT") {
      let doctorMarkdown = await db.Markdowns.findOne({
        where: {
          doctorId: inputData.doctorId,
        },
      });

      if (doctorMarkdown) {
        await db.Markdowns.update(
          {
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
          },
          {
            where: { doctorId: inputData.doctorId },
          }
        );
      }
    }

    return {
      errCode: 0,
      message: "Save information doctor successfully!",
    };
  } catch (error) {
    console.log(error);
  }
};

let getDetailDoctorById = async (inputId) => {
  try {
    if (!inputId) {
      return {
        errCode: 1,
        message: "Missing required parameters...",
      };
    }

    let data = await db.Users.findOne({
      where: {
        id: inputId,
      },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.Markdowns,
          attributes: ["id", "contentHTML", "contentMarkdown", "description"],
        },
        {
          model: db.AllCodes,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      nest: true,
      raw: false,
    });

    if (!data) {
      data = {};
    }

    // convert buffer -> base64
    if (data && data.image) {
      data.image = new Buffer(data.image, "base64").toString("binary");
    }

    return {
      errCode: 0,
      message: "Get infor doctor successfully!",
      data: data,
    };
  } catch (error) {
    console.log(error);
  }
};

let bulkCreateSchedule = async (data) => {
  try {
    if (!data.arrSchedule || !data.doctorId || !data.formattedDate) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }

    let schedule = data.arrSchedule;
    if (schedule && schedule.length > 0) {
      schedule = schedule.map((item) => {
        item.maxNumber = MAX_NUMBER_SCHEDULE;
        return item;
      });
    }

    // get all existing data
    let existing = await db.Schedules.findAll({
      where: { doctorId: data.doctorId, date: data.formattedDate },
      attributes: ["timeType", "date", "doctorId", "maxNumber"],
    });

    // convert date
    if (existing && existing.length > 0) {
      existing = existing.map((item) => {
        item.date = new Date(item.date).getTime();
        return item;
      });
    }

    // compare different
    let toCreate = _.differenceWith(schedule, existing, (a, b) => {
      return a.timeType === b.timeType && a.date === b.date;
    });

    // create data
    if (toCreate && toCreate.length > 0) {
      await db.Schedules.bulkCreate(toCreate);
    }

    return {
      errCode: 0,
      message: "Create bulk schedule successfully!",
    };
  } catch (error) {
    console.log(error);
  }
};

let getScheduleByDate = async (doctorId, date) => {
  try {
    if (!doctorId || !date) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }

    let data = await db.Schedules.findAll({
      where: {
        doctorId: doctorId,
        date: date,
      },
    });

    if (!data) data = [];

    return {
      errCode: 0,
      message: "Get schedule by date successfully!",
      data: data,
    };
  } catch (error) {
    console.log(error);
  }
};

export {
  getTopDoctorHome,
  getAllDoctors,
  saveDetailInforDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleByDate,
};
