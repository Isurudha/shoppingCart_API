const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

const { OAuth2Client } = require("google-auth-library");
const { response } = require("express");
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require("jsonwebtoken");
const API_KEY = process.env.API_KEY;

router.post("/", async (req, res) => {
    try {
      console.log(req.body.email);
      if (!req.body.username || !req.body.email || !req.body.password) {
        return res
          .status(400)
          .send({ message: "Please make sure to enter all field" });
      } else {
        await User.findOne({ email : req.body.email}).exec(async (err, user) => {
          if (err) {
            return res.status(400).json({
              error: "Something went wrong..!",
            });
          } else {
            if (user) {
              let token = jwt.sign(
                { id: user._id, email: user.email, isAdmin: user.isAdmin },
                API_KEY
              );
              return res
                .status(200)
                .send({ token: token, isAdmin: user.isAdmin, id: user._id });
            } else {
              let salt = await bcrypt.genSalt(10);
              let hashedpw = await bcrypt.hash(req.body.password, salt);
  
              let user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedpw,
              });
              user = await user.save();
              let token = jwt.sign(
                { id: user._id, email: user.email, isAdmin: user.isAdmin },
                API_KEY
              );
              req.session._id = user._id;
              return res
                .status(200)
                .send({ token: token, isAdmin: user.isAdmin, id: user._id });
            }
          }
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
  });

  router.post("/google", async (req, res) => {
    console.log("Google call");
    try {
      if (!req.body.token) {
        return res
          .status(400)
          .send({ message: "Please make sure to send token" });
      } else {
        const ticket = await client.verifyIdToken({
          idToken: req.body.token,
          audience: process.env.CLIENT_ID,
        });
  
        console.log(ticket);
  
        const { email_verified, name, email } = ticket.getPayload();
        console.log(email_verified, name, email);
        if (email_verified) {
          await User.findOne({ email: email }).exec(async (err, user) => {
            if (err) {
              return res.status(400).json({
                error: "Something went wrong..!",
              });
            } else {
              console.log("Eles part");
              if (user) {
                console.log("User", user);
                let token = jwt.sign(
                  { id: user._id, email: user.email, isAdmin: user.isAdmin },
                  API_KEY
                );
                return res
                  .status(200)
                  .send({ token: token, isAdmin: user.isAdmin, id: user._id });
              } else {
                console.log("User", "New User");
                let salt = await bcrypt.genSalt(10);
                let hashedpw = await bcrypt.hash(email + name, salt);
  
                let user = new User({
                  username: name,
                  email: email,
                  password: hashedpw,
                });
                user = await user.save();
                console.log(user);
                let token = jwt.sign(
                  { id: user._id, email: user.email, isAdmin: user.isAdmin },
                  API_KEY
                );
                req.session.userid = user.id;
                return res
                  .status(200)
                  .send({ token: token, isAdmin: user.isAdmin, id: user._id });
              }
            }
          });
        }
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });
  
  module.exports = router;