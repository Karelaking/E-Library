import Books from "@/models/bookModel";
import asyncHandler from "@/utils/asyncHandler";
import errorHandler from "@/utils/error_handler";
import cloudinary from "@/config/cloudinary.config";
import type { IRequest } from "@/types/requestTypes";
import uploadCloudinary from "@/utils/uploadCloudinary";

import path from "path";
import { promises } from "fs";
import type { Response, NextFunction } from "express";

class BookController {
  addBook = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      const author = request.user?._id;
      const { isbn, title, description, price, category } = request.body;

      const file = request.files as {
        cover: Express.Multer.File[];
        file: Express.Multer.File[];
      };

      // upload cover image to cloudinary
      const uploadCover = await uploadCloudinary(
        "book-covers",
        path.resolve(
          __dirname,
          "../../public/data/imgaes",
          file.cover[0].filename
        ),
        file.cover[0]
      );

      // upload book file to cloudinary
      const uploadFile = await uploadCloudinary(
        "book-pdfs",
        path.resolve(
          __dirname,
          "../../public/data/imgaes",
          file.file[0].filename
        ),
        file.file[0]
      );

      // create new book
      const book = await Books.create({
        isbn,
        title,
        price,
        author,
        category,
        description,
        file: uploadFile?.secure_url,
        cover: uploadCover?.secure_url,
      });

      if (!book) {
        return next(errorHandler(501, "Book not created"));
      }

      // delete uploaded files
      try {
        await promises.unlink(
          path.resolve(
            __dirname,
            `../../public/data/imgaes`,
            file.file[0].filename
          )
        );
        await promises.unlink(
          path.resolve(
            __dirname,
            `../../public/data/imgaes`,
            file.cover[0].filename
          )
        );
      } catch (error: any) {
        next(errorHandler(500, error.message));
      }

      return response.status(201).json({
        status: 201,
        book: book._id,
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
