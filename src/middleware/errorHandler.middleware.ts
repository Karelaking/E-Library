import { config } from "@/config/config";

import type { HttpError } from "http-errors";
import type { Request, Response, NextFunction } from "express";

/**
 * Express error handler middleware.
 *
 * @param {HttpError} error - The error that should be handled.
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The Express next function.
 *
 * @returns {Response} The response containing the error message and status code.
 */
const global_error_handler = (
  error: HttpError,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  const statusCode = error.statusCode || 500;

  return response.status(statusCode).json({
    status: statusCode,
    message: error.message,
    errorStack: config.env === "development" ? error.stack : "",
  });
};

export default global_error_handler;
