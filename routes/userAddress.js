const express = require("express");
const Address = require("../models/UserAddress");
const router = express.Router();

//get all the adress
router.get("/", async (req, res) => {
    try {
      let adress = await Adress.find();
      return res.status(200).send(adress);
    } catch (ex) {
      return res.status(500).send(ex.message);
    }
  });

  //get a one adress with id 
router.get("/:user", async (req, res) => {
    console.log(req.params.user);
    try {
      let adress = await Address.findOne({user :req.params.user});
      if (!adress) {
        return res.status(404).send("The address you request does not exist");
      }
      return res.status(200).send(adress);
    } catch (ex) {
      return res.status(500).send(ex.message);
    }
  });

  module.exports = router;