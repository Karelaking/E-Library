import { config } from "@/config/config";

import path from "path";
import multer from "multer";

const filePath = path.resolve(__dirname, "../../public/data/imgaes");

// define multer upload middleware
const upload = multer({
  dest: filePath,
  limits: {
    fileSize: Number(config.uploadFileSize),
  },
}).fields([
  { name: "cover", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);

export default upload;
