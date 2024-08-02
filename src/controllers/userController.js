import {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  editUser,
  deleteUser,
  getAllCode,
} from "../services/userService";

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // validate email/password
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameters!",
    });
  }

  let userData = await handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.message,
    user: userData.user ? userData.user : {},
  });
};

const handleGetAllUsersController = async (req, res) => {
  let id = req.query.id; // ALL, SINGLE (id)
  let users = await getAllUsers(id);
  // console.log(users);

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameters",
      users: [],
    });
  }

  return res.status(200).json({
    errCode: 0,
    message: "Ok",
    users: users,
  });
};

const handleCreateNewUserController = async (req, res) => {
  let data = await createNewUser(req.body);
  // console.log(data);
  return res.status(200).json({
    errCode: data.errCode,
    message: data.message,
  });
};

const handleEditUserController = async (req, res) => {
  let data = await editUser(req.body);

  return res.status(200).json({
    errCode: data.errCode,
    message: data.message,
  });
};

const handleDeleteUserController = async (req, res) => {
  let userId = req.body.id;
  // console.log("userId", userId);
  if (!userId) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameters!",
    });
  }
  let data = await deleteUser(userId);
  return res.status(200).json({
    errCode: data.errCode,
    message: data.message,
  });
};

const handleGetAllCodeController = async (req, res) => {
  try {
    // setTimeout(async () => {
    //   const type = req.query.type;
    //   let data = await getAllCode(type);
    //   return res.status(200).json(data);
    // }, 2000);
    const type = req.query.type;
    let data = await getAllCode(type);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Get all code error: ", error);
    return res.status(200).json({
      errCode: -1,
      message: "Something wrongs in service...",
    });
  }
};

export {
  handleLogin,
  handleGetAllUsersController,
  handleCreateNewUserController,
  handleEditUserController,
  handleDeleteUserController,
  handleGetAllCodeController,
};
