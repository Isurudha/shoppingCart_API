const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const router = express.Router();

//get all - Ishanka
router.get("/", async (req, res) => {
  try {
    let cart = await Cart.find();
    if (!cart) {
      return res
        .status(404)
        .send({ meesage: "The cart you request does not exist" });
    }
    return res.send(cart);
  } catch (ex) {
    return res.status(500).send({ message: ex.message });
  }
});

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
  
//add a new Cart
  router.post("/", async (req, res) => {
    console.log(req.body.user, req.body.productId);
    if(!req.body.user || !req.body.productId)
    {
        return res.status(400).send("Please send the all values");
    }
    console.log(req.body.user,req.body.productId);
    let cart = await Cart.findOne({user : req.body.user});
    console.log("Cart",cart);
  if (!cart) {
    console.log("inside condition")
    let product = await Product.findOne({_id:req.body.productId});
    let newcart = new Cart({items:[{
        "productId": req.body.productId,
        "qty": req.body.qty,
        "price": product.price,
        "title": product.title,
        "productCode": product.productCode,
        "imagePath": product.imagePath,
        }],
        totalQty : req.body.qty,
        totalCost : product.price * req.body.qty,
        user: req.body.user
    });
    try {
    cart = await newcart.save();
    return res.send(cart);
  } catch (err) {
    return res.status(500).send(err.message);
  }
  }
  else{
      let item = await Cart.findOne({"items.productId" : req.body.productId}, {user : req.body.user});
        let cart = await Cart.findOne({user : req.body.user});
        let product = await Product.findOne({_id:req.body.productId});
        let newitem = {
        "productId": req.body.productId,
        "qty": req.body.qty,
        "price": product.price,
        "title": product.title,
          "productCode": product.productCode,
        "imagePath": product.imagePath,
        }
        cart.items.push(newitem);
        cart.set({
        totalQty : cart.totalQty + req.body.qty,
        totalCost : cart.totalCost + product.price * req.body.qty,
        user: req.body.user
        });
        try {
            cart = await cart.update(cart);
              return res.send(cart);
        } catch (err) {
            return res.status(500).send(err.message);
        }
      }
});

//delete
router.post("/:id/:user", async (req, res) => {
  console.log(req.params.user, req.params.id);
  let cart = await Cart.findOne({ user: req.params.user });
  //{ $pull: { results: { score: 8 , item: "B" } } }
  try {
    cart = await Cart.findOneAndUpdate(
      { user: req.params.user },
      { $pull: { items: { _id: req.params.id } } }
    );
    cart.items.pull({ _id: req.params.id });
    console.log(cart);
    if (!cart)
      return res
        .status(404)
        .send("The Product you request to delete does not exist in DB");
    return res.send(cart);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

  module.exports = router;