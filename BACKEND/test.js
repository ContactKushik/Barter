import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: "drdt9oiwm",
  api_key: "146771548478714",
  api_secret: "Yw4erqmstQUVPs797r-CArMXmQw", // Click 'View API Keys' above to copy your API secret
});

(async function () {
  try {
    const uploadResult = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      { public_id: "shoes" }
    );

    console.log("Upload Success:", uploadResult);
  } catch (error) {
    console.error("Upload Failed:", error);
  }
})();
