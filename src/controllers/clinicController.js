import {
  createNewClinic,
  // getAllClinic,
  // getDetailClinicById,
} from "../services/clinicService";

const createNewClinicController = async (req, res) => {
  try {
    let data = await createNewClinic(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in service...",
    });
  }
};

export { createNewClinicController };
