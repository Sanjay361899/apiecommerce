const jwt=require("jsonwebtoken")

 const jwtoken = (id) => {
  var token = jwt.sign({  id }, process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
  return token;
}

module.exports=jwtoken;
