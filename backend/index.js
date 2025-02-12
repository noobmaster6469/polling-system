import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();

dotenv.config();
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
