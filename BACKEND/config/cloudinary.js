// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";

// dotenv.config(); // Ensure you load Cloudinary API keys from .env

// cloudinary.config({
//   cloud_name: 'drdt9oiwm',
//   api_key: '146771548478714',
//   api_secret: 'Yw4erqmstQUVPs797r-CArMXmQw',
// });

// export default cloudinary;
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
