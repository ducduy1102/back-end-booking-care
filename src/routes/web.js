import express from "express";
import {
  getHomePageController,
  getCRUDController,
  postCRUDController,
  displayGetCRUDController,
} from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", getHomePageController);
  router.get("/crud", getCRUDController);
  router.post("/post-crud", postCRUDController);
  router.get("/get-crud", displayGetCRUDController);

  return app.use("/", router);
};

export default initWebRoutes;
