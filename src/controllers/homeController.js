import db from "../models";

const getHomePageController = async (req, res) => {
  try {
    let data = await db.users.findAll();
    console.log(data);
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

export { getHomePageController };
