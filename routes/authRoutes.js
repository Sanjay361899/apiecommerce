const express=require("express");
const { userRegister, userLogin, allUser, deleteUser, updateUser } = require("../controllers/userctrl.js");
const { authMiddleWare, isAdmin } = require("../middleware/authMiddleware.js");
const authRoute=express();
authRoute.post("/register",userRegister)
authRoute.post("/login",userLogin)
authRoute.get("/all",authMiddleWare,isAdmin,allUser)
authRoute.delete("/delete",isAdmin,deleteUser)
authRoute.put("/update",isAdmin,updateUser)
module.exports = authRoute

