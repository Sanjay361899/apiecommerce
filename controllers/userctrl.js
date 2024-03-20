const userModel = require("../models/userModel.js")
const asyncHandler=require("express-async-handler")
var jwt = require('jsonwebtoken');
const jwtoken = require("../config/jwtoken.js");
const refreshToken = require("../config/refreshToken.js");
const expressAsyncHandler = require("express-async-handler");
const userRegister=asyncHandler(async(req,res)=>{
    try {
        const findData= await userModel.findOne({email:req.body.email})
        if(!findData){
           const createNewUser=await userModel.create(req.body)
           const data=await createNewUser.save()
           const token=jwtoken(data._id)
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
          
            const token=jwtoken(findData?._id)
            const reToken=refreshToken(findData?._id)
            const updatedData= await userModel.findByIdAndUpdate({_id:findData?._id},{refreshToken:reToken},{new:true});
            res.cookie("refreshToken",reToken,{maxAge: 72*60*60*1000, httpOnly: true })
           res.status(200).send({message:"record fetched of the login", data:updatedData,token})
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
const getSingleUser=asyncHandler(async(req,res)=>{
    try{
     const id=req?.params?.id;
     const userDetail= await userModel.findById({_id:id})
     if(userDetail){
      res.status(200).send({message:`here is the user detail of ${id}`,data:userDetail})
     }else{ 
        throw new Error("user with this id doesn't exist.")
     }
    }catch(error){
        throw new Error(error?.message)
    }

})
const blockUser= asyncHandler(async(req,res)=>{
    const id=req.params.id;
    const findData=await userModel.findByIdAndUpdate({_id:id},{isBlocked:true},{new:true});
    if(!findData){
        throw new Error("There is no such user exist with this id.")
    }else{
        res.status(200).send({message:`the user is blocked with this id ${id} you have passed.`,updatedData:findData})
    }
});
const unblockUser= asyncHandler(async(req,res)=>{
    const id=req.params.id;
    const findData=await userModel.findByIdAndUpdate({_id:id},{isBlocked:false},{new:true});
    if(!findData){
        throw new Error("There is no such user exist with this id.")
    }else{
        res.status(200).send({message:`the user is unblocked with this id ${id} you have passed.`,updatedData:findData})
    }
})
const handleCookiess=asyncHandler(async(req,res)=>{
    // const cokkies=req.cookies
    const cookies = req.cookies.refreshToken; 
    console.log(cookies,"cokkies");
    const user=await userModel.findOne({refreshToken:cookies})
    if(!user) throw new Error("There is no such user exist which have this refresh token.");
    jwt.verify(cookies,process.env.JWT_SECRET_KEY,(error,decode)=>{
        if(error||user._id!=decode.id){
            throw new Error("there is something wrong in referesh token")
        }
        const token=jwtoken(user?._id);
        res.json({accessToken:token});
    })
})
const handleLogout=asyncHandler(async(req,res)=>{
    const cookies = req.cookies.refreshToken; 
    console.log(cookies);
    if(!cookies) throw new Error("there is no such referesh token present here.")
    const user= await userModel.findOne({refreshToken:cookies})
if(user){
    await userModel.findOneAndUpdate({refreshToken:cookies},{refreshToken:""})
    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true
    });
    return res.status(204).send("success")
}
res.clearCookie("refreshToken",{
    httpOnly:true,
    secure:true
});
return res.status(204).send("success") //forbidden
});
module.exports={userRegister,userLogin,allUser,deleteUser,updateUser,getSingleUser,blockUser,unblockUser,handleCookiess,handleLogout}