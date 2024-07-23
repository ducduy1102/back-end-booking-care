import bcrypt from "bcryptjs";
import db from "../models";
import { raw } from "body-parser";

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

export { createNewUser, getAllUser };
