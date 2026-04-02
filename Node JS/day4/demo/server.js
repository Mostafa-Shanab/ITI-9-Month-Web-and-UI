import express from "express";
import mongoose from "mongoose";
import cors from "cors";


import studentRoute from "./routes/studentRoute.js";
import courseRoute from "./routes/courseRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
const app=express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/student",studentRoute)
app.use("/course", courseRoute);
app.use("/upload",uploadRoute)


app.set("view engine","ejs");
app.set ("views","./views")

mongoose.connect('mongodb://localhost:27017/ui_db').then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("error connecting to database",err);
})



app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status||500).json({
        success:false,
        message:err.message
    })
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})