import Books from "@/models/bookModel";
import asyncHandler from "@/utils/asyncHandler";
import errorHandler from "@/utils/error_handler";
import cloudinary from "@/config/cloudinary.config";
import type { IRequest } from "@/types/requestTypes";

import { file } from "bun";
import type { Response, NextFunction } from "express";
import path from "path";

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
      const uploadCover = await cloudinary.v2.uploader.upload(
        path.resolve(
          __dirname,
          "../../public/data/imgaes",
          file.cover[0].filename
        ),
        {
          folder: "book-covers",
          format: file.cover[0].mimetype.split("/")[-1],
          filename_override: file.cover[0].originalname,
        }
      ).catch((err) => next(errorHandler(500, err.message)));

      // upload book file to cloudinary
      const uploadFile = await cloudinary.v2.uploader.upload(
        path.resolve(
          __dirname,
          "../../public/data/imgaes",
          file.file[0].filename
        ),
        {
          folder: "book-pdfs",
          resource_type: "raw",
          format: file.file[0].mimetype.split("/")[-1],
          filename_override: file.file[0].originalname,
        }
      ).catch((err) => next(errorHandler(500, err.message)));

      // create new book
      const book = Books.create({
        isbn,
        title,
        price,
        author,
        category,
        description,
        file: uploadFile?.secure_url,
        cover: uploadCover?.secure_url,
      }).catch((err) => next(errorHandler(500, err.message)));



      return response.status(200).json({
        status: 200,
        book: book,
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
