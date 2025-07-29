import { config } from "./config/config";
import cookieParser from "cookie-parser";
import global_error_handler from "@/middleware/errorHandler.middleware";

import express, { type Express } from "express";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

// API Routes
import userRouter from "@/routes/userRouter";
import bookRouter from "@/routes/bookRoutes";

// API Prefix for all routes
app.use(`${config.apiPrefix}/users`, userRouter);
app.use(`${config.apiPrefix}/books`, bookRouter);

app.use(global_error_handler);

export default app;
