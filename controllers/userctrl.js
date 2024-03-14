const asyncHandler=require("express-async-handler")
const userModel = require("../models/userModel")
const userRegister=asyncHandler(async(req,res)=>{
    try {
        const findData= await userModel.findOne({email:req.body.email})
        if(!findData){
           const createNewUser=await userModel.create(req.body)
           await createNewUser.save()
           res.status(200).send({message:"record is stored in db", data:createNewUser})
        }else{
            throw new Error("User With this email already Existing")
        }
    } catch (error) {
        throw new Error(error?.message)
    }
});
module.exports={userRegister}