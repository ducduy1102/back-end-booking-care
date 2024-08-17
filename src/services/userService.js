import { where } from "sequelize";
import db from "../models";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (userPassword) => {
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
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
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
    if (user) {
      let isCorrectPassword = await checkUserPassword(password, user.password);
      if (isCorrectPassword) {
        return {
          errCode: 0,
          message: "Login successfully!",
          user: {
            id: user.id,
            email: user.email,
            roleId: user.roleId,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        };
      }
    }
    return {
      errCode: 1,
      message: "Your email / password is incorrect!",
      data: "",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Something wrongs in service...",
      errCode: -1,
    };
  }
};

const getAllUsers = async (userId) => {
  try {
    let users = "";
    if (userId === "ALL") {
      users = await db.Users.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
    }
    if (userId && userId !== "ALL") {
      users = await db.Users.findOne({
        where: { id: userId },
        attributes: {
          exclude: ["password"],
        },
      });
    }
    return users;
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

const createNewUser = async (data) => {
  try {
    // validate if data null
    // validateUserData(data);
    if (data.email === "") {
      return {
        errCode: 1,
        message: "Email is not empty. Please enter your email!",
      };
    } else {
      // check email existed
      let isEmailExisted = await checkUserEmail(data.email);
      if (isEmailExisted === true) {
        return {
          errCode: 1,
          message: "Email already exists.",
        };
      }
    }
    if (data.password === "") {
      return {
        errCode: 1,
        message: "Password is not empty. Please enter your password!",
      };
    }
    if (data.firstName === "") {
      return {
        errCode: 1,
        message: "First name is not empty. Please enter your first name!",
      };
    }
    if (data.lastName === "") {
      return {
        errCode: 1,
        message: "Last name is not empty. Please enter your last name!",
      };
    }

    let hashPasswordFromBcrypt = await hashUserPassword(data.password);
    await db.Users.create({
      email: data.email,
      password: hashPasswordFromBcrypt,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      roleId: data.roleId,
      positionId: data.positionId,
      image: data.avatar,
    });
    return {
      errCode: 0,
      message: "Create a new user successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

const editUser = async (data) => {
  try {
    if (!data.id || !data.roleId || !data.positionId || !data.gender) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
      };
    }

    let user = await db.Users.findOne({
      where: { id: data.id },
    });
    if (!user) {
      return {
        errCode: 2,
        message: "User isn't exist.",
      };
    }
    // if (user.email !== data.email) {
    //   return {
    //     errCode: 3,
    //     message: "Email is not allowed to update!",
    //   };
    // }

    // Có bug là update dc email nếu như ko truyền email mặc định
    // await db.Users.update(data, {
    //   where: { id: data.id },
    // });

    if (data.avatar) {
      await db.Users.update(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        },
        {
          where: { id: data.id },
        }
      );
    } else {
      await db.Users.update(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
        },
        {
          where: { id: data.id },
        }
      );
    }

    return {
      errCode: 0,
      message: "Update user successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

const deleteUser = async (userId) => {
  try {
    let user = await db.Users.findOne({
      where: { id: userId },
    });
    if (!user) {
      return {
        errCode: 2,
        message: "User isn't exist.",
      };
    }
    await db.Users.destroy({
      where: {
        id: userId,
      },
    });
    return {
      errCode: 0,
      message: "Delete user successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

const getAllCode = async (type) => {
  try {
    if (!type) {
      return {
        errCode: 1,
        message: "Missing required parameters!",
        data: {},
      };
    }

    let allcode = await db.AllCodes.findAll({
      where: {
        type: type,
      },
    });

    return {
      errCode: 0,
      message: "Get all code successfully!",
      data: allcode,
    };
  } catch (error) {
    return {
      errCode: -1,
      message: "Something wrongs in service...",
    };
  }
};

export {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  editUser,
  deleteUser,
  getAllCode,
};
