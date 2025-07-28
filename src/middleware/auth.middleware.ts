import User from "@/models/userModel";
import { config } from "@/config/config";
import type { IUser } from "@/types/userTypes";
import asyncHandler from "@/utils/asyncHandler";
import type { IRequest } from "@/types/requestTypes";
import errorHandler from "@/utils/error_handler";

import jwt from "jsonwebtoken";
import type { NextFunction, Response } from "express";

const jwtSecret = config.secret as string;

// muddleware to protect routes
export const validator = asyncHandler(
  async (request: IRequest, response: Response, next: NextFunction) => {
    try {
      const token = request.cookies.token as string;

      if (!token) {
        return next(errorHandler(401, "Token not found"));
      }
      const decoded = jwt.verify(token, jwtSecret) as IUser;

      if (!decoded) {
        return next(errorHandler(401, "Unable to decode token"));
      }

      const user = await User.findById(decoded?._id as string).select(
        "-password"
      );

      if (!user) {
        return next(errorHandler(401, "User not found"));
      }

      request.user = user as IUser;

      next();
    } catch (error: any) {
      return next(errorHandler(401, error.message));
    }
  }
);
