const mongoose = require("mongoose");
const SchemaProduct = new mongoose.Schema({
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default:
      "https://m.media-amazon.com/images/I/71apAqfPa3L.jpg",
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
  },
  Isavailable: {
    type: Boolean,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", SchemaProduct);