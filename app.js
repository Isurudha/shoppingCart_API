require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const products = require("./routes/products");
const home = require("./routes/home");
const carts = require("./routes/cart");
const address = require("./routes/userAddress");

<<<<<<< HEAD
 mongoose
 .connect(process.env.DATABASE_HOST + process.env.DATABASE_NAME,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     //useFindAndModify: false, //not support
     //useCreateIndex: true,  //not support
 })
 .then(() => console.log("Connected to db Successfuly...!"))
 .catch((err) =>
 console.log("Error has occurred while connecting to DB : ", err)
 );
=======
mongoose
.connect(process.env.DATABASE_HOST + process.env.DATABASE_NAME,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to db Successfuly...!"))
.catch((err) =>
console.log("Error has occurred while connecting to DB : ", err)
);
>>>>>>> e49a01f8557ae7d3f5dcabde09565eced9856630

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // uses a express inbuilt middleware to parse JSON
app.use("/", home);
app.use("/api/products", products);
app.use("/api/carts", carts);
app.use("/api/address", address);


//listed to port
app.listen(PORT, () => {
    console.log("Starting listening on port " + PORT);
  });
  