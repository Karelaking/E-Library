import type { Request, Response, NextFunction } from "express";

const asyncHandler = (fn: Function) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await fn(request, response, next);
    } catch (error: any) {
      next(error);
    }
  };
};

export default asyncHandler;
