/**
 * Uploads a file to Cloudinary.
*
* @param {string} folder - The Cloudinary folder to upload to.
* @param {string} filePath - The path to the file to upload.
* @param {Express.Multer.File} file - The file to upload from Multer.
*
* @returns {Promise<Cloudinary.UploadApiResult | null>} The result from Cloudinary, or null if there was an error.
*/

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
