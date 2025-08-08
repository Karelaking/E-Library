import { validator } from "@/middleware/auth.middleware";
import AuthController from "@/controllers/authController";

import { Router } from "express";

// define user routes
const authRouter = Router();

// define user controller
const authController = new AuthController();

authRouter.route("/login").post(authController.login);
authRouter.route("/register").post(authController.register);
authRouter.route("/logout").post(validator, authController.logout);
authRouter.route("/delete").delete(validator, authController.delete);

export default authRouter;
