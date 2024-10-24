import express from "express";

const app = express();

//controller
app.get("/", (req, res) => {
  res.send("Server is ready Sir Justen");
});

app.listen(6000, () => {
  console.log("Server started at http://localhost:6000");
});
