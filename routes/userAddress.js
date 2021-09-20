const express = require("express");
const Address = require("../models/UserAddress");
const router = express.Router();


//get all - Ishanka
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

  //add a new adress
router.post("/", async (req, res) => {
  if (
    !req.body.user ||
    !req.body.addressLine01 ||
    !req.body.addressLine02 ||
    !req.body.city ||
    !req.body.state ||
    !req.body.zip
  ) {
    return res.status(400).send("Please fill the all values");
  }
  let newaddress = new Address({
    user : req.body.user ,
    addressLine01: req.body.addressLine01 ,
    addressLine02:req.body.addressLine02,
    city:req.body.city, 
    state:req.body.state,
    zip : req.body.zip
  });
  try {
    newaddress = await newaddress.save();
    return res.status(200).send(newaddress);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});


  module.exports = router;