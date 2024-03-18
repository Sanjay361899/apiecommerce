const express=require("express")
const dbConnect = require("./config/dbConfig.js")
const authRoute=require('./routes/authRoutes.js')
const { NotFound, ErrorHandler } = require("./middleware/errorHandling.js")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("dotenv/config")
const port=process.env.PORT||2000;
dbConnect();

app.use("/api/user",authRoute)
app.use(NotFound)
app.use(ErrorHandler)
app.listen(2000,()=>{
    console.log(`server is running on ${port}`);
})