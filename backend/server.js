import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

//controller
app.get("/products", (req, res) => {
  //res.send("Server is ready Sir Justen");
});

app.listen(4000, () => {
  connectDB();
  console.log("Server started at http://localhost:4000");
});
