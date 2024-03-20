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
    role:{
        type:String,
        default:"User"
    },
    cart:{
        type:Array,
        default:[]
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    address:[{type:mongoose.Schema.Types.ObjectId,ref:"Address"}],
    wishList:[{type:mongoose.Schema.Types.ObjectId,ref:"Product"}],
    refreshToken:{
        type:String
    }
});

//Export the model
module.exports = mongoose.model('User', userSchema);