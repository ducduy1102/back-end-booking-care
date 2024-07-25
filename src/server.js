import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import "dotenv/config";
import { connectDB } from "./config/connectDB";

const app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

// Test connection db
connectDB();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(">>> Server is running on port = " + port);
});
