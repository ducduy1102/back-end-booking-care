import db from "../models";
require("dotenv").config();

let postBookAppointment = async (data) => {
  try {
    if (!data.email || !data.doctorId || !data.timeType || !data.date) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }
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
      message: "Schedule appointment successfully!",
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
