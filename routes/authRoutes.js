const express=require("express");
const { userRegister, userLogin, allUser, deleteUser, updateUser } = require("../controllers/userctrl.js");
const authRoute=express();
authRoute.post("/register",userRegister)
authRoute.post("/login",userLogin)
authRoute.get("/all",allUser)
authRoute.delete("/delete",deleteUser)
authRoute.put("/update",updateUser)
module.exports = authRoute

