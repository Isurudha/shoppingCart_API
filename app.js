const express = require("express");
const mongoose = require("mongoose");

mongoose
.connect("mongodb://localhost/ShoppingCartdb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to db Successfuly...!"))
.catch((err) =>
console.log("Error has occurred while connecting to DB : ", err)
);

const app = express();
const PORT = 5000;

//listed to port
app.listen(PORT, () => {
    console.log("Starting listening on port " + PORT);
  });
  