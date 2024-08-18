import {
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
  deleteClinic,
  editClinic,
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

const getAllClinicController = async (req, res) => {
  try {
    let data = await getAllClinic();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in service...",
    });
  }
};

const getDetailClinicByIdController = async (req, res) => {
  try {
    let clinicId = req.query.id;
    let infor = await getDetailClinicById(clinicId);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in service...",
    });
  }
};

const deleteClinicController = async (req, res) => {
  try {
    let clinicId = req.body.id;
    let data = await deleteClinic(clinicId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in service...",
    });
  }
};

const editClinicController = async (req, res) => {
  try {
    let data = await editClinic(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in service...",
    });
  }
};

export {
  createNewClinicController,
  getAllClinicController,
  getDetailClinicByIdController,
  deleteClinicController,
  editClinicController,
};
