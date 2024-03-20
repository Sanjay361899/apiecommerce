const jwt=require("jsonwebtoken")

 const refreshToken = (id) => {
  var token = jwt.sign({  id }, process.env.JWT_SECRET_KEY,{expiresIn:"3d"});
  return token;
}

module.exports=refreshToken;
