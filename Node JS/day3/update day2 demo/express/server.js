import express from "express";
import studentRoute from "./routes/studentRoute.js";
const app = express();

//barsing for body
app.use(express.json());
//application level middleware
app.get("/student",(req,res,next)=>{
  console.log("middleware");
  next();
})


app.use("/student",studentRoute);


//error handling middleware
app.use((err,req,res,next)=>{
  res.status(500).json({message:err.message})
})


app.listen(5000, () => {
  console.log("server is running");
});



