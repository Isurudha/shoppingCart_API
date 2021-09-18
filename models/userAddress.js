const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const useradressSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Address", useradressSchema);