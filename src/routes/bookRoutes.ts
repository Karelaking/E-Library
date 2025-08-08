import { validator } from "@/middleware/auth.middleware";
import BookController from "@/controllers/bookController";

import { Router } from "express";
import upload from "@/middleware/multer.middleware";

const bookRouter = Router();
const bookController = new BookController();

bookRouter.route("/").post(validator, upload, bookController.addBook);
bookRouter.route("/:id").delete(validator, bookController.deleteBook);

export default bookRouter;

