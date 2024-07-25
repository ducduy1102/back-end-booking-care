import { handleUserLogin } from "../services/userService";

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

export { handleLogin };
