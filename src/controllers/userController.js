import { handleUserLogin, getAllUsers } from "../services/userService";

let handleLogin = async (req, res) => {
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
  let id = req.body.id; // ALL, SINGLE (id)
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

export { handleLogin, handleGetAllUsersController };
