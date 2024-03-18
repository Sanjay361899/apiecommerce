const express=require("express");
const { userRegister } = require("../controllers/userctrl.js");
const authRoute=express();
authRoute.post("/register",userRegister)
module.exports = authRoute

