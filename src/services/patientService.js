import db from "../models";
require("dotenv").config();
import { sendSimpleEmail } from "./emailService";

let postBookAppointment = async (data) => {
  try {
    if (!data.email || !data.doctorId || !data.timeType || !data.date) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }
    await sendSimpleEmail({
      receiverEmail: data.email,
      patientName: "Nguyễn Đức",
      time: "8:00 - 9:00 Thứ tư 14/8/2024",
      doctorName: "Evil Shadow",
      redirectLink: "https://github.com/ducduy1102",
    });
    let user = await db.Users.findOrCreate({
      where: { email: data.email },
      defaults: {
        email: data.email,
        roleId: "R3",
      },
    });

    // create a booking record
    if (user && user[0]) {
      await db.Bookings.findOrCreate({
        where: { patientId: user[0].id },
        defaults: {
          statusId: "S1",
          doctorId: data.doctorId,
          patientId: user[0].id,
          date: data.date,
          timeType: data.timeType,
        },
      });
    }

    return {
      errCode: 0,
      message: "Appointment booking successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

export { postBookAppointment };
