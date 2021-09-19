const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");

const User = require("../models/user");
const API_KEY = process.env.API_KEY;



  