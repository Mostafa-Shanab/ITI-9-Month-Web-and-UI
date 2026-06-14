import dbConnect from "@/lib/mongodb";
import User from "@/models/user";

export default async function handler(req,res){
    await dbConnect()
    //? get req
    if(req.method === 'GET'){
        const Users = await User.find()
        return res.status(200).json(Users)
    }
    //? post req --> create
}