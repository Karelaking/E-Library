import dotenv from "dotenv";

dotenv.config();

const _config = {
  port: process.env.PORT,
  databaseURL: process.env.MONGO_DB_URL,
};

export const config = Object.freeze(_config);
