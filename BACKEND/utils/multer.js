import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const extnames = [".png", ".jpg", ".jpeg", ".webp"];
  let ext = path.extname(file.originalname);
  let includeornot = extnames.includes(ext);
  if (!includeornot) {
    return cb(new Error("Only images are allowed"), false);
  }
  cb(null, includeornot);
};
const upload = multer({ storage: storage, fileFilter });

export default upload;
