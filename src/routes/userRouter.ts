import UserController from "@/controllers/userController";

import { Router } from "express";


const userRouter = Router();
const userController = new UserController();

userRouter.route("/register").post(userController.register);


export default userRouter;
