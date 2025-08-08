import { Router } from "express";
import { validator } from "@/middleware/auth.middleware";
import UserController from "@/controllers/userController";
import { adminValidator } from "@/middleware/adminValidator.middleware";

const userRouter = Router();
const userController = new UserController();

// get user routes
userRouter.route("/get").get(validator, userController.getUser);
userRouter
  .route("/:id")
  .get(validator, adminValidator, userController.getUserById);

// update user routes
userRouter.route("/").put(validator, userController.updateFullUser);
userRouter
  .route("/:id")
  .put(validator, adminValidator, userController.updateFullUserById);

userRouter.route("/").patch(validator, userController.updateUser);
userRouter
  .route("/:id")
  .patch(validator, adminValidator, userController.updateUserById);

userRouter
  .route("/password")
  .patch(validator, userController.updateUserPassword);
userRouter
  .route("/password/:id")
  .patch(validator, adminValidator, userController.updateUserPasswordById);

// delete user routes
userRouter.route("/delete").delete(validator, userController.deleteUser);
userRouter
  .route("/:id")
  .delete(validator, adminValidator, userController.deleteUserById);

export default userRouter;
