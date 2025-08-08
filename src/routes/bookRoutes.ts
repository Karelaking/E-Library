import { validator } from "@/middleware/auth.middleware";
import BookController from "@/controllers/bookController";
import { adminValidator } from "@/middleware/adminValidator.middleware";

import { Router } from "express";
import upload from "@/middleware/multer.middleware";

const bookRouter = Router();
const bookController = new BookController();

// post book routes
bookRouter.route("/").post(validator, upload, bookController.addBook);

// get book routes
bookRouter.route("/:id").get(validator, bookController.getBookById);
bookRouter.route("/All").get(validator, bookController.getAllBook);

// update book routes
bookRouter
  .route("/:id")
  .put(validator, adminValidator, upload, bookController.updateBookById);

bookRouter
  .route("/:id")
  .patch(validator, adminValidator, upload, bookController.updateBookById);

bookRouter
  .route("/price/:id")
  .patch(validator, adminValidator,bookController.updateBookPriceById);

// delete book routes
bookRouter.route("/:id").delete(validator, bookController.deleteBookById);

export default bookRouter;
