import db from "../models";
require("dotenv").config();
import { sendSimpleEmail } from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.REACT_URL2}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

let checkRequiredFields = (inputData) => {
  let arrFields = [
    "fullname",
    "phoneNumber",
    "email",
    "address",
    "doctorId",
    "timeType",
    "date",
    "reason",
    "birthday",
    "selectedGender",
  ];

  let isValid = true;
  let element = "";

  // Regex pattern for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  for (let i = 0; i < arrFields.length; i++) {
    // Additional condition to check if it's the email field and validate it
    if (arrFields[i] === "email" && !emailRegex.test(inputData[arrFields[i]])) {
      isValid = false;
      // element = arrFields[i];
      element = "Invalid email format";
      break;
    }

    if (!inputData[arrFields[i]]) {
      isValid = false;
      element = arrFields[i];
      break;
    }
  }
  return {
    isValid,
    element,
  };
};

let postBookAppointment = async (data) => {
  try {
    // if (
    //   !data.email ||
    //   !data.doctorId ||
    //   !data.timeType ||
    //   !data.date ||
    //   !data.fullname ||
    //   !data.selectedGender ||
    //   !data.address ||
    //   !data.fullname ||
    //   !data.phoneNumber
    // ) {
    //   return {
    //     errCode: 1,
    //     message: "Missing required parameters!",
    //   };
    // }

    let checkObj = checkRequiredFields(data);

    if (checkObj.isValid === false) {
      if (checkObj.element === "Invalid email format") {
        return {
          errCode: 1,
          message: `Invalid email format`,
        };
      }
      return {
        errCode: 1,
        message: `Missing parameters ${checkObj.element} `,
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
        birthday: data.birthday,
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
          reason: data.reason,
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
