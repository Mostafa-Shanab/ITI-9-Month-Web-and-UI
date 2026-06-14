import mongoose from "mongoose"

//? get by id , delete by id , put 
//? findById  , findByIdAndDelete , findByIdAndUpdate 
const {id} = req.query 
if(!mongoose.Types.ObjectId.isValid(id)){

}