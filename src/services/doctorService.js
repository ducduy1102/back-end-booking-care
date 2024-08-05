import db from "../models";

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

const saveDetailInforDoctor = async (inputData) => {
  try {
    if (
      !inputData.doctorId ||
      !inputData.contentHTML ||
      !inputData.contentMarkdown
    ) {
      return {
        errCode: 1,
        message: "Missing parameters...",
      };
    }

    await db.Markdowns.create({
      contentHTML: inputData.contentHTML,
      contentMarkdown: inputData.contentMarkdown,
      description: inputData.description,
      doctorId: inputData.doctorId,
    });

    return {
      errCode: 0,
      message: "Save information doctor successfully!",
    };
  } catch (error) {
    console.log(error);
  }
};

export { getTopDoctorHome, getAllDoctors, saveDetailInforDoctor };
