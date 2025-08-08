import type { IBook } from "@/types/bookTypes";
import errorHandler from "@/utils/error_handler";
import uploadCloudinary from "@/utils/uploadCloudinary";

import { Schema, model } from "mongoose";

// define book schema with mongoose
const bookSchema = new Schema<IBook>(
  {
    isbn: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

bookSchema.methods.uploadFile = async function (
  fileName: string,
  filePath: string,
  fileType: Express.Multer.File
): Promise<any> {
  try {
    return await uploadCloudinary(fileName, filePath, fileType);
  } catch (error: any) {
    errorHandler(500, error.message);
  }
};

const Books = model<IBook>("Books", bookSchema);

export default Books;

