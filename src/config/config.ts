import { env } from "bun";

const _config = {
  apiPrefix: process.env.API_PREFIX,

  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,

  databaseURL: process.env.MONGO_DB_URL,
  databaseName: process.env.MONGO_DB_NAME,

  env: env.NODE_ENV,

  port: process.env.PORT,

  secret: process.env.JWT_SECRET,

  uploadFileSize: process.env.UPLOAD_FILE_SIZE,
};



export const config = Object.freeze(_config);
