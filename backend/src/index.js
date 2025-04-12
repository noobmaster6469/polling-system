import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import pollRoute from "./routes/polls.route.js";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const port = process.env.PORT || 3000;

app.use("/api/auth", authRoute);
app.use("/api/poll", pollRoute);

app.listen(port, () => {
  console.log("Server is running on port " + port);
  connectDB();
});
