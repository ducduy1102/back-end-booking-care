import db from "../models";
import {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
} from "../services/CRUDService";

const getHomePageController = async (req, res) => {
  try {
    let data = await db.Users.findAll();
    console.log(data);
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

const getCRUDController = async (req, res) => {
  return res.render("crud.ejs");
};

const postCRUDController = async (req, res) => {
  let message = await createNewUser(req.body);
  // console.log(message);
  return res.redirect("/get-crud");
};

const displayGetCRUDController = async (req, res) => {
  let data = await getAllUser();
  // console.log("data ", data);
  return res.render("displayCRUD.ejs", { dataUser: data });
};

const editCRUDController = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await getUserInfoById(userId);
    return res.render("editCRUD.ejs", { userData });
  } else {
    return res.send("User not found!");
  }
};

const putCRUDController = async (req, res) => {
  let data = req.body;
  await updateUserData(data);
  return res.redirect("/get-crud");
};

const deleteCRUDController = async (req, res) => {
  let userId = req.params.id;
  if (!userId) return;
  await deleteUserById(userId);
  return res.redirect("/get-crud");
};

export {
  getHomePageController,
  getCRUDController,
  postCRUDController,
  displayGetCRUDController,
  editCRUDController,
  putCRUDController,
  deleteCRUDController,
};
