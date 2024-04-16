const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userR = require("./src/Routes/userRoutes");
const app = express();

const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Anil");
});

mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

app.use("/user", userR);

app.listen(port, () => console.log("Server connected on port " + port));
