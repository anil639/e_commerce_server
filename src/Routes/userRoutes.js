const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../Model/users");

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.json({ success: newUser });
  } catch (error) {
    res.json(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ Message: "Please enter all required fields" });
    }
    const mail = await userModel.findOne({ email: email });
    if (!mail) {
      res.json({ Message: "Please enter correct email" });
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      mail.password
    );
    if (checkPassword) {
      res.json({ Message: "Welcome", mail });
    } else {
      res.json({ Message: "Wrong Password" });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
