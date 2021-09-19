const express = require("express");
const Product = require("../models/product");
const router = express.Router();

//Get all products
router.get("/", async (req, res) => {
    try {
      let products = await Product.find();
      return res.status(200).send(products);
    } catch (ex) {
      return res.status(500).send(ex.message);
    }
  });

//get a one product with id
router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    try {
      let product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send("The product does not exist");
      }
      return res.status(200).send(product);
    } catch (ex) {
      return res.status(500).send(ex.message);
    }
  });

  //update a product 
router.put("/:id", async (req, res) => {
    console.log(req.body.image);
    let requestedID = req.params.id;
    let product = await Product.findById(requestedID);
    if (!product) {
      return res
        .status(404)
        .send("Product does not exist on the MCU");
    }
    product.set({
      productCode: req.body.productCode,
      title: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      manufacturer: req.body.manufacturer,
      imagePath: req.body.image,
      available: req.body.Isavailable,
    });
    try {
      product = await product.save();
      return res.status(200).send(product);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  module.exports = router;