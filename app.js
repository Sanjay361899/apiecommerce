const express=require("express")
const { NotFound, ErrorHandler } = require("./middleware/errorHandler")
const dbConnect = require("./config/dbConfig")
const { route } = require("./routes/authRoutes")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("dotenv/config")
const port=process.env.PORT||2000;
dbConnect();
app.use(NotFound)
app.use(ErrorHandler)
app.get("/",()=>{
    console.log("Server is running on port.")
});
app.use("/api/user",route)
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})