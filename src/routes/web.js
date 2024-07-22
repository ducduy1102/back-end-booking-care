import express from "express";
import { getHomePageController } from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", getHomePageController);

  router.get("/me", (req, res) => {
    return res.send("Hello Me!");
  });

  return app.use("/", router);
};

export default initWebRoutes;
