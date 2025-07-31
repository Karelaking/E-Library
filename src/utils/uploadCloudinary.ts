import errorHandler from "./error_handler";
import cloudinary from "@/config/cloudinary.config";

const uploadCloudinary = async (
  folder: string,
  filePath: string,
  file: Express.Multer.File
) => {
  const upload = await cloudinary.v2.uploader
    .upload(filePath, {
      folder: folder,
      format: file.mimetype.split("/")[-1],
      filename_override: file.originalname,
    })
    .catch((err) => errorHandler(500, err.message));

  return upload;
};

export default uploadCloudinary;
