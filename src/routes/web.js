import express from "express";
import {
  getHomePageController,
  getCRUDController,
  postCRUDController,
} from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", getHomePageController);
  router.get("/crud", getCRUDController);
  router.post("/post-crud", postCRUDController);
  router.get("/me", (req, res) => {
    return res.send("Hello Me!");
  });

  return app.use("/", router);
};

export default initWebRoutes;
