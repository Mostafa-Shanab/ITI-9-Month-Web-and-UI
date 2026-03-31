import express from "express";
import mongoose from "mongoose";


import studentRoute from "./routes/studentRoute.js";


const app=express();

app.use(express.json());


app.use("/student",studentRoute)





mongoose.connect('mongodb://localhost:27017/ui_db').then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("error connecting to database",err);
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})