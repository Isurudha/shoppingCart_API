const mongoos = require("mongoose")

const User = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdminUser: {
      type: Boolean,
      default: false,
    },
  });
  
  module.exports = mongoose.model("User", User);