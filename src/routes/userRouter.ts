import { validator } from "@/middleware/auth.middleware";
import UserController from "@/controllers/userController";

import { Router } from "express";

const userRouter = Router();
const userController = new UserController();

userRouter.route("/login").post(userController.login);
userRouter.route("/logout").post(validator, userController.logout);
userRouter.route("/delete").delete(validator, userController.delete);
userRouter.route("/register").post(userController.register);

export default userRouter;
