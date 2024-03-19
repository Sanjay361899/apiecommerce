const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
var jwt = require('jsonwebtoken');
const authMiddleWare=expressAsyncHandler(async(req,res,next)=>{
try {
    const tokenString= req?.headers?.authorization
    if(tokenString)
    {const decode = jwt.verify(tokenString,process.env.JWT_SECRET_KEY)
    req.user=await userModel.findById({_id:decode?.id})  
    next();
}else{
    throw new Error("You have not enter a token.")
}
} catch (error) {
    throw new Error(error?.message)
}
});
const isAdmin = expressAsyncHandler(async(req,res,next)=>{
    try {
        const {role}=req.user;
        if(role.toLowerCase()=="admin"){
            next()
        }else{
            throw new Error("You are not an Admin.")
        }
    } catch (error) {
        throw new Error(error?.message)
    }
})
module.exports={authMiddleWare,isAdmin}
