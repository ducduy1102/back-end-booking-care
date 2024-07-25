import bcrypt from "bcryptjs";
import db from "../models";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.Users.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("Create a new user successfully!");
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

// 2 ways
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.Users.findAll({ raw: true });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserInfoById = async (userId) => {
  try {
    let user = await db.Users.findOne({
      where: {
        id: userId,
      },
      raw: true,
    });
    if (!user) {
      return {};
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};

let updateUserData = async (data) => {
  // console.log("data from server", data);
  try {
    await db.Users.update(data, {
      where: {
        id: +data.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

let deleteUserById = async (userId) => {
  try {
    // console.log("userID", userId);
    await db.Users.destroy({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
