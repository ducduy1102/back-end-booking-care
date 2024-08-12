import { postBookAppointment } from "../services/patientService";

const postBookAppointmentController = async (req, res) => {
  try {
    let infor = await postBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in service...",
    });
  }
};

export { postBookAppointmentController };
