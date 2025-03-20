import mongoose from "mongoose";

// mongoose.connect('mongodb://localhost:27017/AUTH_TODAY')
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to db");
  } catch (error) {
    console.log("Mongo db connection error: " + error);
    process.exit(1);
  }
};

export default connectDb;