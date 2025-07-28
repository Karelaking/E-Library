import User from "@/models/userModel";
import type { IRequest } from "@/types/IRequest";
import type { IUser } from "@/types/userTypes";
import asyncHandler from "@/utils/asyncHandler";
import errorHandler from "@/utils/error_handler";

import type { Request, Response, NextFunction } from "express";

class UserController {
  test = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      return response.status(200).json({
        status: 200,
        message: "Test",
        body: request.body,
      });
    }
  );

  register = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      // get user data from request body
      const { name, email, password, address, phone, gender, role } =
        request.body;

      // check if user already exists
      const user = await User.findOne({ email });

      if (user) {
        return next(errorHandler(400, "User already exists"));
      }

      // create new user
      const newUser = User.create({
        name,
        email,
        password,
        address,
        phone,
        gender,
        role,
      });

      // check user is created or not
      if (!newUser) {
        return next(errorHandler(501, "User not created"));
      }

      // generate auth token
      const token = (await newUser).generateAuthToken();

      // send response
      return response.status(201).json({
        status: 201,
        message: "User created successfully",
      });
    }
  );

  login = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      // get user data from request body
      const { email, password } = request.body;

      // check if user exists
      const user = await User.findOne({ email });

      if (!user) {
        return next(errorHandler(400, "User not found"));
      }

      // check if password is correct
      const isPasswordCorrect = await user.comparePassword(password);

      if (!isPasswordCorrect) {
        return next(errorHandler(400, "Incorrect password"));
      }

      // generate auth token
      const token = user.generateAuthToken();

      user.accsesToken = token;
      user.save();

      // send Response
      return response
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .status(200)
        .json({
          status: 200,
          message: "Logged in successfully",
        });
    }
  );

  logout = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      // get user data from request body
      const { email } = request.user as IUser;
      const { password } = request.body;

      // check if user exists
      const user = await User.findOne({ email });

      if (!user) {
        return next(errorHandler(400, "User not found"));
      }

      // check if password is correct
      const isPasswordCorrect = await user.comparePassword(password);

      if (!isPasswordCorrect) {
        return next(errorHandler(400, "Incorrect password"));
      }

      // generate auth token
      const token = user.generateAuthToken();

      user.accsesToken = "";
      user.save();

      // send Response
      return response
        .cookie("token", "", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 0,
        })
        .status(200)
        .json({
          status: 200,
          message: "Logged out successfully",
        });
    }
  );

  delete = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      const {_id} = request.user as IUser;
      const { password } = request.body;

      const user = await User.findById(_id);

      if (!user) {
        return next(errorHandler(400, "User not found"));
      }

      // check if user password is correct or not
      const isPasswordCorrect = await user.comparePassword(password);

      if (!isPasswordCorrect) {
        return next(errorHandler(400, "Incorrect password"));
      }

      // check if user is logged in or not
      if (!user.accsesToken) {
        return next(errorHandler(400, "User not logged in"));
      }

      // delete user
      await User.deleteOne({ _id: user._id });

      // send response
      return response
        .cookie("token", "", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 0,
        })
        .status(200)
        .json({
          status: 200,
          message: "User deleted successfully",
        });
    }
  );
}

export default UserController;
