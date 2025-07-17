import { config } from "./config/config";
import global_error_handler from "@/middleware/global_error_handler";

import express, { type Express } from "express";

const app: Express = express();

app.use(express.json());

// API Routes
import userRouter from "./routes/userRouter";

app.use(`${config.apiPrefix}/users`, userRouter);

app.use(global_error_handler);

export default app;
