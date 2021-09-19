const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const router = express.Router();

  //get a cart details for specific user
router.get("/:id", async (req, res) => {
    try {
      let cart = await Cart.findOne({ user: req.params.id });
      if (!cart) {
        return res.status(404).send({meesage : "The cart Item does not exist"});
      }
      return res.send(cart);
    } catch (ex) {
      return res.status(500).send({message : ex.message});
    }
  });

  //get all item for specific user
router.get("/items/:id", async (req, res) => {
    try {
      let cart = await Cart.findOne({ user: req.params.id });
      if (!cart) {
        return res.status(404).send({meesage : "The cart Item does not exist"});
      }
      return res.send(cart.items);
    } catch (ex) {
      return res.status(500).send({message : ex.message});
    }
  });

  module.exports = router;