import {
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  deleteSpecialty,
  editSpecialty,
} from "../services/specialtyService";

const createNewSpecialtyController = async (req, res) => {
  try {
    let data = await createNewSpecialty(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in service...",
    });
  }
};

const getAllSpecialtyController = async (req, res) => {
  try {
    let data = await getAllSpecialty();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in service...",
    });
  }
};

const getDetailSpecialtyByIdController = async (req, res) => {
  try {
    let specialtyId = req.query.id;
    let location = req.query.location;
    let infor = await getDetailSpecialtyById(specialtyId, location);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in service...",
    });
  }
};

const deleteSpecialtyController = async (req, res) => {
  try {
    let specialtyId = req.body.id;
    let data = await deleteSpecialty(specialtyId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in service...",
    });
  }
};

const editSpecialtyController = async (req, res) => {
  try {
    let data = await editSpecialty(req.body);
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
  createNewSpecialtyController,
  getAllSpecialtyController,
  getDetailSpecialtyByIdController,
  deleteSpecialtyController,
  editSpecialtyController,
};
