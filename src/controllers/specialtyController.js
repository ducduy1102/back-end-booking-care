import { createNewSpecialty } from "../services/specialtyService";

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

export { createNewSpecialtyController };
