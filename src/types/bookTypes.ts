import { Document } from "mongoose";

interface BaseBook extends Document {
  _id: string;
  isbn: string;
  file: string;
  title: string;
  cover: string;
  price: number;
  author: string;
  category: string;
  description: string;
}

export type IBook = BaseBook;
