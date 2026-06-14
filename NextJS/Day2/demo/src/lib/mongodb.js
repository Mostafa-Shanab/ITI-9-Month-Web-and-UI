import mongoose from "mongoose";

const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/next_crud";
if (!MONGODB_URL) {
  throw new Error("there is some problem in mongodb url");
}
let isConnected = false;
export default async function dbConnect() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(MONGODB_URL);
    isConnected=db.connections[0].readyState;
    console.log("MongoDB is Connected");
  } catch (err) {
    console.log(err);
  }
}
