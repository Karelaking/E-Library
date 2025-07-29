import { validator } from "@/middleware/auth.middleware";
import UserController from "@/controllers/userController";

import { Router } from "express";

// define user routes
const userRouter = Router();

// define user controller
const userController = new UserController();

userRouter.route("/login").post(userController.login);
userRouter.route("/register").post(userController.register);
userRouter.route("/logout").post(validator, userController.logout);
userRouter.route("/delete").delete(validator, userController.delete);

export default userRouter;
