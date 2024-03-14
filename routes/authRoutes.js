const express=require("express");
const { userRegister } = require("../controllers/userctrl");
const router=express();
router.post("/register",userRegister)
module.exports=router;