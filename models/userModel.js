const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:[{type:mongoose.Schema.Types.ObjectId,ref:""}],
    cart:[{type:mongoose.Schema.Types.ObjectId,ref:""}],
});

//Export the model
module.exports = mongoose.model('User', userSchema);