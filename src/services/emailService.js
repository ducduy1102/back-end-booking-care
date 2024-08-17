require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Booking Care Evil Shadow Web 👻" <ducduy1110uit@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bênh online trên Booking Care Evil Shadow Web</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    <div>Xin chân thành cảm ơn!</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Hello ${dataSend.patientName}!</h3>
    <p>You received this email because you booked an online appointment on Booking Care Evil Shadow Web.</p>
    <p>Appointment details:</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    <p>If the above information is correct, please click the link below to confirm and complete the appointment booking procedure.</p>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    <div>Thank you very much!</div>
  `;
  }

  return result;
};

let sendAttachment = async (dataSend) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"Booking Care Evil Shadow Web 👻" <ducduy1110uit@gmail.com>', // sender address
      to: dataSend.email, // list of receivers
      subject: "Kết quả đặt lịch khám bệnh", // Subject line
      html: getBodyHTMLEmailRemedy(dataSend),
      attachments: [
        {
          // encoded string as an attachment
          filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
          content: dataSend.imgBase64.split("base64,")[1],
          encoding: "base64",
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bênh online trên Booking Care Evil Shadow Web thành công!</p>
    <p>Thông tin đơn thuốc / hóa đơn được gửi trong file đính kèm.</p>
    <div>Xin chân thành cảm ơn!</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Hello ${dataSend.patientName}!</h3>
    <p>You are receiving this email because you have successfully booked an online medical appointment on Booking Care Evil Shadow Web!</p>
    <p>Prescription / invoice information is sent in the attached file.</p>
    <div>Thank you very much!</div>
  `;
  }

  return result;
};

export { sendSimpleEmail, sendAttachment };
