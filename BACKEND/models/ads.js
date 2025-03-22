import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  images: { 
    type: [String], 
    validate: [arr => arr.length <= 3, "Maximum 3 images allowed"] 
  }, // Array of image URLs (max 3)
  location: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "sold"], default: "active" },
  price: { type: Number, required: true }, // Price in rupees
  category: { type: String, required: true }, // Category of the ad
});

const Ad = mongoose.model("Ad", adSchema);
export default Ad;
