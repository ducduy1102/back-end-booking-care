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
import {
  handleLogin,
  handleGetAllUsersController,
  handleCreateNewUserController,
  handleEditUserController,
  handleDeleteUserController,
} from "../controllers/userController";

const router = express.Router();

const initWebRoutes = (app) => {
  // test crud on server
  router.get("/", getHomePageController);
  router.get("/crud", getCRUDController);
  router.post("/post-crud", postCRUDController);
  router.get("/get-crud", displayGetCRUDController);
  router.get("/edit-crud", editCRUDController);
  router.post("/put-crud", putCRUDController);
  router.post("/delete-crud/:id", deleteCRUDController);

  // crud on client
  router.post("/api/login", handleLogin);
  router.get("/api/get-all-users", handleGetAllUsersController);
  router.post("/api/create-new-user", handleCreateNewUserController);
  router.put("/api/edit-user", handleEditUserController);
  router.delete("/api/delete-user", handleDeleteUserController);

  return app.use("/", router);
};

export default initWebRoutes;
