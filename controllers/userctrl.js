const userModel = require("../models/userModel.js")
const asyncHandler=require("express-async-handler")
var jwt = require('jsonwebtoken');
const userRegister=asyncHandler(async(req,res)=>{
    try {
        const findData= await userModel.findOne({email:req.body.email})
        if(!findData){
           const createNewUser=await userModel.create(req.body)
           const data=await createNewUser.save()
           var token = jwt.sign({ id: data._id }, process.env.JWT_SECRET_KEY);

           res.status(200).send({message:"record is stored in db", data:createNewUser,token})
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
           var token = jwt.sign({ id: findData._id }, process.env.JWT_SECRET_KEY);

           res.status(200).send({message:"record fetched of the login", data:findData,token})
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
const updateUser=asyncHandler(async(req,res)=>{
    try {
        const data= await userModel.findByIdAndUpdate({_id:req.body.id},{email:req?.body?.email,mobile:req?.body?.mobile},{new:true});
        res.status(200).send({message:"this data is updated as per your given data.",updatedInfo:data})
    } catch (error) {
        throw new Error(error?.message)
    }
})
const deleteUser=asyncHandler(async(req,res)=>{
    try {
      const data=  await userModel.findByIdAndDelete({_id:req?.body?.id})
      console.log(data,"data is get")
      res.status(200).send({message:"Data is deleted."})
    } catch (error) {
        throw new Error(error?.message)
    }
})
module.exports={userRegister,userLogin,allUser,deleteUser,updateUser}