const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userR = require("./src/Routes/userRoutes");
const productsR = require("./src/Routes/productRoutes");
const app = express();

const port = 8000;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));
//Routes
app.use("/user", userR);
app.use("/products", productsR);

app.listen(port, () => console.log("Server connected on port " + port));
