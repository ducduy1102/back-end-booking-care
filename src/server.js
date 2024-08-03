import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import "dotenv/config";
import { connectDB } from "./config/connectDB";
// import cors from "cors";
import configCors from "../src/config/cors";

const app = express();
// config cors
// app.use(cors({ credentials: true, origin: true }));
configCors(app);

// config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }, { imit: "50mb" }));

viewEngine(app);
initWebRoutes(app);

// Test connection db
connectDB();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(">>> Server is running on port = " + port);
});
