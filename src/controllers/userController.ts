import asyncHandler from "@/utils/asycnHandler";

import type { Request, Response, NextFunction } from "express";

class UserController {
  register = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      return response.status(200).json({
        status: 200,
        message: "Registered successfully",
      });
    }
  );

  login = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      return response.status(200).json({
        status: 200,
        message: "Login successfully",
      });
    }
  );

  logout = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      return response.status(200).json({
        status: 200,
        message: "Logged out successfully",
      });
    }
  );

  delete = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      return response.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    }
  );
}

export default UserController;
