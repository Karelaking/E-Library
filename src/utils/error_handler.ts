import { config } from "@/config/config";
import type { HttpError } from "http-errors";
import type { Request, Response, NextFunction } from "express";

const error_handler = (
  error: HttpError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;

  return response.status(statusCode).json({
    status: statusCode,
    message: error.message,
    errorStack: config.env === "development" ? error.stack : '',
  });
};

export default error_handler;
