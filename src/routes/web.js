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
  handleGetAllCodeController,
} from "../controllers/userController";
import {
  getTopDoctorHomeController,
  getAllDoctorsController,
  postInforDoctorController,
  getDetailDoctorByIdController,
  bulkCreateScheduleController,
} from "../controllers/doctorController";

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

  router.get("/api/allcode", handleGetAllCodeController);

  // doctor
  router.get("/api/top-doctor-home", getTopDoctorHomeController);
  router.get("/api/get-all-doctors", getAllDoctorsController);
  router.post("/api/save-infor-doctor", postInforDoctorController);
  router.get("/api/get-detail-doctor-by-id", getDetailDoctorByIdController);
  router.post("/api/bulk-create-schedule", bulkCreateScheduleController);

  return app.use("/", router);
};

export default initWebRoutes;
