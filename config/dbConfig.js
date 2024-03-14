const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
const dbConnect=async ()=>{
    try {
       await mongoose.connect('mongodb://localhost:27017/WisDomShop');
       console.log("mongo db is connected")
    } catch (error) {
        throw new Error(error);
    }
}
module.exports=dbConnect