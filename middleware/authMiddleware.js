const expressAsyncHandler = require("express-async-handler");

const authMiddleWare=expressAsyncHandler(async(req,res,next)=>{
try {
    const tokenString= req.headers.authorization.startsWith("Bearer")
    console.log(tokenString,"tokenEntered");
} catch (error) {
    throw new Error(error?.message)
}
});
