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

interface IBookMethods extends Document {
  uploadFile: (
    fileName: string,
    filePath: string,
    fileType: Express.Multer.File
  ) => Promise<any>;
}

export type IBook = BaseBook & IBookMethods;
