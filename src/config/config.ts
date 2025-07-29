import { env } from "bun";

const _config = {
  env: env.NODE_ENV,
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  apiPrefix: process.env.API_PREFIX,
  databaseURL: process.env.MONGO_DB_URL,
  uploadFileSize: process.env.UPLOAD_FILE_SIZE,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};



export const config = Object.freeze(_config);
