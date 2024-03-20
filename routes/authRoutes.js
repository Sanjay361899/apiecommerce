const express=require("express");
const { userRegister, userLogin, allUser, deleteUser, updateUser, getSingleUser, blockUser, unblockUser, handleCookie, handleCookiess, handleLogout } = require("../controllers/userctrl.js");
const { authMiddleWare, isAdmin } = require("../middleware/authMiddleware.js");
const authRoute=express();
authRoute.post("/register",userRegister)
authRoute.post("/login",userLogin)
authRoute.get("/all",authMiddleWare,isAdmin,allUser)
authRoute.delete("/delete",isAdmin,deleteUser)
authRoute.get("/cookie",handleCookiess)
authRoute.get("/logout",handleLogout)
authRoute.put("/update",isAdmin,updateUser)
authRoute.get("/:id",authMiddleWare,isAdmin,getSingleUser)
authRoute.put("/block/:id",authMiddleWare,isAdmin,blockUser)
authRoute.put("/unBlock/:id",authMiddleWare,isAdmin,unblockUser)
module.exports = authRoute

