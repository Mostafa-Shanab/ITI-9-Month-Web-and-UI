import mongoose from "mongoose";

const {Schema}=mongoose;
const studentSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:[3,"name must be at least 3 characters long"],
        maxlength:[30,"name must be at most 30 characters long"],
        trim:true
    },email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        match:[/^[A-Za-z0-9]{3,15}@(gmail|yahoo)\.(com)$/,"email must be a valid email address"]
    },status:{
        type:String,
        enum:["student","graduated"],
        default:"student"
    }

})
const studentModel=mongoose.model("student",studentSchema)

export default studentModel;