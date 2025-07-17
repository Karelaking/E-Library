import errorHandler from "@/utils/error_handler";
import global_error_handler from "@/middleware/global_error_handler";

import express, { type Express } from "express";

const app: Express = express();

app.use(global_error_handler);

export default app;
