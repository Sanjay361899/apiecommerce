const userModel = require("../models/userModel.js")
const asyncHandler=require("express-async-handler")
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

const userLogin=asyncHandler(async(req,res)=>{
    try {
        const findData= await userModel.findOne({email:req.body.email , password:req.body.password})
        if(findData){
           res.status(200).send({message:"record fetched of the login", data:findData})
        }else{
            throw new Error("Invalid email or password")
        }
    } catch (error) {
        throw new Error(error?.message)
    }
});
const allUser=asyncHandler(async(req,res)=>{
    try {
        const findData= await userModel.find()
        if(findData){
            res.status(200).send({message:"All data is fetched.", data:findData})
        }else{
         throw new Error("There is no data in db")
        }
        
    } catch (error) {
        throw new Error(error?.message)
    }
})
const deleteUser=asyncHandler(async(req,res)=>{
    try {
      const data=  await userModel.findByIdAndDelete(req?.body?.id)
      console.log(data,"data is get")
      res.status(200).send({message:"Data is deleted."})
    } catch (error) {
        throw new Error(error?.message)
    }
})
module.exports={userRegister,userLogin,allUser,deleteUser}