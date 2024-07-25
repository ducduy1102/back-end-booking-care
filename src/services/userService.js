import db from "../models";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkUserPassword = async (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

const checkUserEmail = async (userEmail) => {
  try {
    let user = await db.Users.findOne({
      where: { email: userEmail },
    });
    if (!user) return false;
    return true;
  } catch (error) {
    console.log(error);
  }
};

const handleUserLogin = async (email, password) => {
  try {
    let user = await db.Users.findOne({
      where: {
        email: email,
      },
      raw: true,
    });
    // console.log("usser", user);
    if (user) {
      let isCorrectPassword = await checkUserPassword(password, user.password);
      if (isCorrectPassword) {
        return {
          errCode: 0,
          message: "ok",
          user: {
            email: user.email,
            roleId: user.roleId,
          },
        };
      }
    }
    return {
      errCode: 1,
      message: "Your email / phone number or password is incorrect!",
      data: "",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Something wrongs in service..",
      errorCode: -1,
    };
  }
};

export { handleUserLogin };
