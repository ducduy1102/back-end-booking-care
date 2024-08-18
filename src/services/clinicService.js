import db from "../models";

let createNewClinic = async (data) => {
  try {
    if (
      !data.name ||
      !data.address ||
      !data.imageBase64 ||
      !data.descriptionHTML | !data.descriptionMarkdown
    ) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }

    await db.Clinics.create({
      name: data.name,
      address: data.address,
      image: data.imageBase64,
      descriptionHTML: data.descriptionHTML,
      descriptionMarkdown: data.descriptionMarkdown,
    });

    return {
      errCode: 0,
      message: "Create a new clinic successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

let getAllClinic = async () => {
  try {
    let data = await db.Clinics.findAll({
      attributes: {
        exclude: [
          "descIntroductionHTML",
          "descIntroduction",
          "descProfessionalStrengthsHTML",
          "descProfessionalStrengths",
          "descEquipmentHTML",
          "descEquipment",
          "descLocationHTML",
          "descLocation",
          "descProcessHTML",
          "descProcess",
        ],
      },
    });

    if (!data)
      return {
        errCode: 0,
        message: "Get all clinic successfully!",
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
      message: "Get all clinic successfully!",
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

let getDetailClinicById = async (clinicId) => {
  try {
    if (!clinicId) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }

    let data = await db.Clinics.findOne({
      where: {
        id: clinicId,
      },
      attributes: ["name", "address", "descriptionHTML", "descriptionMarkdown"],
    });

    if (data) {
      let doctorClinic = [];
      doctorClinic = await db.Doctor_Infor.findAll({
        where: {
          clinicId: clinicId,
        },
        attributes: ["doctorId", "provinceId"],
      });
      data.doctorClinic = doctorClinic;
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

const deleteClinic = async (clinicId) => {
  try {
    let clinic = await db.Clinics.findOne({
      where: { id: clinicId },
    });
    if (!clinic) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }
    await db.Clinics.destroy({
      where: {
        id: clinicId,
      },
    });

    return {
      errCode: 0,
      message: "Delete clinic successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

let editClinic = async (data) => {
  try {
    if (
      !data.id ||
      !data.name ||
      !data.address ||
      !data.imageBase64 ||
      !data.descriptionHTML | !data.descriptionMarkdown
    ) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }

    let clinic = await db.Clinics.findOne({
      where: { id: data.id },
    });
    if (!clinic) {
      return {
        errCode: 2,
        message: "Clinic isn't exist.",
      };
    }
    if (data.imageBase64) {
      await db.Clinics.update(
        {
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        },
        {
          where: { id: data.id },
        }
      );
    } else {
      await db.Clinics.update(
        {
          name: data.name,
          address: data.address,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        },
        {
          where: { id: data.id },
        }
      );
    }

    return {
      errCode: 0,
      message: "Update clinic successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

export {
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
  deleteClinic,
  editClinic,
};
