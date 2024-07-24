import express from "express";
import {
  getHomePageController,
  getCRUDController,
  postCRUDController,
  displayGetCRUDController,
  editCRUDController,
  putCRUDController,
  deleteCRUDController,
} from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", getHomePageController);
  router.get("/crud", getCRUDController);

  router.post("/post-crud", postCRUDController);
  router.get("/get-crud", displayGetCRUDController);
  router.get("/edit-crud", editCRUDController);
  router.post("/put-crud", putCRUDController);
  router.post("/delete-crud/:id", deleteCRUDController);

  return app.use("/", router);
};

export default initWebRoutes;
