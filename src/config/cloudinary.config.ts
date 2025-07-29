import { config as conf } from "@/config/config";

import cloudinary from "cloudinary";


cloudinary.v2.config({
  cloud_name: conf.cloudinaryCloudName as string,
  api_key: conf.cloudinaryApiKey as string,
  api_secret: conf.cloudinaryApiSecret as string,
});

export default cloudinary;
