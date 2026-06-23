import { connect } from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error(
      "\n❌ MONGO_URI is not set. Open the .env file and paste your MongoDB connection string into MONGO_URI.\n",
    );
    process.exit(1);
  }

  try {
    await connect(uri);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
