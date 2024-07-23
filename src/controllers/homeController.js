import db from "../models";
import { createNewUser, getAllUser } from "../services/CRUDService";

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
  console.log(message);
  return res.send("post crud from server");
};

const displayGetCRUDController = async (req, res) => {
  let data = await getAllUser();
  console.log("data ", data);
  return res.render("displayCRUD.ejs", { dataUser: data });
};

export {
  getHomePageController,
  getCRUDController,
  postCRUDController,
  displayGetCRUDController,
};
