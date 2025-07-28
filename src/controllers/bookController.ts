import Books from "@/models/bookModel";
import asyncHandler from "@/utils/asyncHandler";
import errorHandler from "@/utils/error_handler";
import type { IRequest } from "@/types/requestTypes";

import type { Response, NextFunction } from "express";

class BookController {
  addBook = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      return response.status(200).json({
        status: 200,
        message: "Book added successfully",
      });
    }
  );

  deleteBook = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      return response.status(200).json({
        status: 200,
        message: "Book deleted successfully",
      });
    }
  );
}

export default BookController;
