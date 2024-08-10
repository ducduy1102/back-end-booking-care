import {
  getTopDoctorHome,
  getAllDoctors,
  saveDetailInforDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleByDate,
  getExtraInforDoctorById,
} from "../services/doctorService";

const getTopDoctorHomeController = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in server...",
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    let doctors = await getAllDoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in server...",
    });
  }
};

const postInforDoctorController = async (req, res) => {
  try {
    // let doctorId = req.query.id;
    let response = await saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in server...",
    });
  }
};

const getDetailDoctorByIdController = async (req, res) => {
  try {
    let doctorId = req.query.id;
    let inforDoctor = await getDetailDoctorById(doctorId);
    return res.status(200).json(inforDoctor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in server...",
    });
  }
};

const bulkCreateScheduleController = async (req, res) => {
  try {
    let infor = await bulkCreateSchedule(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in server...",
    });
  }
};

const getScheduleByDateController = async (req, res) => {
  try {
    const doctorId = req.query.doctorId;
    const date = req.query.date;
    let infor = await getScheduleByDate(doctorId, date);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in server...",
    });
  }
};

const getExtraInforDoctorByIdController = async (req, res) => {
  try {
    const doctorId = req.query.doctorId;
    let infor = await getExtraInforDoctorById(doctorId);
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in server...",
    });
  }
};

export {
  getTopDoctorHomeController,
  getAllDoctorsController,
  postInforDoctorController,
  getDetailDoctorByIdController,
  bulkCreateScheduleController,
  getScheduleByDateController,
  getExtraInforDoctorByIdController,
};
