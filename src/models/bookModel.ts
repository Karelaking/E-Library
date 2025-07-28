import type { IBook } from "@/types/bookTypes";
import type { IRequest } from "@/types/requestTypes";
import type { Response, NextFunction } from "express";
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

const Books = model<IBook>("Books", bookSchema);

export default Books;

