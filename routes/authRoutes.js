const express=require("express");
const { userRegister, userLogin, allUser, deleteUser } = require("../controllers/userctrl.js");
const authRoute=express();
authRoute.post("/register",userRegister)
authRoute.post("/login",userLogin)
authRoute.get("/all",allUser)
authRoute.delete("/delete",deleteUser)
module.exports = authRoute

