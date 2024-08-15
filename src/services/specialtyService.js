import db from "../models";

let createNewSpecialty = async (data) => {
  try {
    if (
      !data.name ||
      !data.imageBase64 ||
      !data.descriptionHTML | !data.descriptionMarkdown
    ) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }

    await db.Specialties.create({
      name: data.name,
      image: data.imageBase64,
      descriptionHTML: data.descriptionHTML,
      descriptionMarkdown: data.descriptionMarkdown,
    });

    return {
      errCode: 0,
      message: "Create a new specialty successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

let getAllSpecialty = async () => {
  try {
    let data = await db.Specialties.findAll();

    if (!data)
      return {
        errCode: 0,
        message: "Get specialty successfully!",
        data: [],
      };

    if (data && data.length > 0) {
      data.map((item) => {
        item.image = new Buffer(item.image, "base64").toString("binary");
        return item;
      });
    }

    return {
      errCode: 0,
      message: "Get specialty successfully!",
      data: data,
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

let getDetailSpecialtyById = async (specialtyId, location) => {
  try {
    if (!specialtyId || !location) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }

    let data = await db.Specialties.findOne({
      where: {
        id: specialtyId,
      },
      attributes: ["descriptionHTML", "descriptionMarkdown"],
    });

    if (data) {
      let doctorSpecialty = [];
      if (location === "ALL") {
        doctorSpecialty = await db.Doctor_Infor.findAll({
          where: {
            specialtyId: specialtyId,
          },
          attributes: ["doctorId", "provinceId"],
        });
      } else {
        // find by specific location
        doctorSpecialty = await db.Doctor_Infor.findAll({
          where: {
            specialtyId: specialtyId,
            provinceId: location,
          },
          attributes: ["doctorId", "provinceId"],
        });
      }
      data.doctorSpecialty = doctorSpecialty;
    } else {
      data = {};
    }

    return {
      errCode: 0,
      message: "Get specialty successfully!",
      data: data,
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

export { createNewSpecialty, getAllSpecialty, getDetailSpecialtyById };
