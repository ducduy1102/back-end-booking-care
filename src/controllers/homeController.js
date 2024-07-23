import db from "../models";
import { createNewUser } from "../services/CRUDService";

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

export { getHomePageController, getCRUDController, postCRUDController };
