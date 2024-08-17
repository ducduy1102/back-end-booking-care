import db from "../models";
require("dotenv").config();
import { sendSimpleEmail } from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.REACT_URL2}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

let postBookAppointment = async (data) => {
  try {
    if (
      !data.email ||
      !data.doctorId ||
      !data.timeType ||
      !data.date ||
      !data.fullname ||
      !data.selectedGender ||
      !data.address ||
      !data.fullname ||
      !data.phoneNumber
    ) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }
    let token = uuidv4();

    await sendSimpleEmail({
      receiverEmail: data.email,
      patientName: data.fullname,
      time: data.timeString,
      doctorName: data.doctorName,
      language: data.language,
      redirectLink: buildUrlEmail(data.doctorId, token),
    });

    // upsert patient
    let user = await db.Users.findOrCreate({
      where: { email: data.email },
      defaults: {
        email: data.email,
        roleId: "R3",
        address: data.address,
        gender: data.selectedGender,
        firstName: data.fullname,
        phoneNumber: data.phoneNumber,
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
          token: token,
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

let postVerifyBookAppointment = async (data) => {
  try {
    if (!data.doctorId || !data.token) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }
    let appointment = await db.Bookings.findOne({
      where: {
        doctorId: data.doctorId,
        token: data.token,
        statusId: "S1",
      },
    });

    if (!appointment) {
      return {
        errCode: 2,
        message: "Appointment has been activated or does not exist!",
      };
    }

    await db.Bookings.update(
      {
        statusId: "S2",
      },
      {
        where: {
          doctorId: data.doctorId,
          token: data.token,
          statusId: "S1",
        },
      }
    );

    return {
      errCode: 0,
      message: "Update the appointment successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

export { postBookAppointment, postVerifyBookAppointment };
