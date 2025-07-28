import { env } from "bun";

const _config = {
  env: env.NODE_ENV,
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  apiPrefix: process.env.API_PREFIX,
  databaseURL: process.env.MONGO_DB_URL,
};



export const config = Object.freeze(_config);
