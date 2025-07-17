import express, { type Express } from "express";
import error_handler from "./utils/error_handler";

const app: Express = express();


app.use(error_handler);
export default app;
