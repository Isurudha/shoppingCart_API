const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");

const User = require("../models/user");
const API_KEY = process.env.API_KEY;

router.post("/", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    console.log(req.body.email, req.body.password);
    if (!user)
      return res
        .status(400)
        .send({ message: "Invalid Email and Password given for authentication" });
  
    let pwValid = await bcrypt.compare(req.body.password, user.password);
    if (!pwValid)
      return res
        .status(400)
        .send({ message: "Invalid Email and Password given for authentication" });
  
    let token = jwtoken.sign(
      { id: user._id, email: user.email, isAdminUser: user.isAdminUser },
      API_KEY
    );
    return res
      .status(200)
      .send({ token: token, isAdminUser: user.isAdminUser, id: user._id });
  });
  module.exports = router;
  