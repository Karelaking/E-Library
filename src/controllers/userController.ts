import User from "@/models/userModel";
import asyncHandler from "@/utils/asyncHandler";
import errorHandler from "@/utils/error_handler";

import type { IRequest } from "@/types/requestTypes";
import type { Response, NextFunction } from "express";

class userController {
  getUser = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      try {
        const users = await User.findById({
          _id: request.user?._id,
        });

        if (!users) {
          return next(errorHandler(400, "User not found"));
        }

        return response.status(200).json(users);
      } catch (error: any) {
        return next(errorHandler(500, error.message));
      }
    }
  );

  getUserById = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      const { id } = request.params;
      try {
        const user = await User.findById(id);

        if (!user) {
          return next(errorHandler(400, "User not found"));
        }

        return response.status(200).json(user);
      } catch (error: any) {
        return next(errorHandler(500, error.message));
      }
    }
  );

  updateFullUser = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      const { name,email, password, role, phone, gender, address } = request.body;
      const  id  = request.user?._id;

      try {
        const user = await User.findById(id);

        if (!user) {
          return next(errorHandler(400, "User not found"));
        }

        user.name = name;
        user.role = role;
        user.phone = phone;
        user.email = email;
        user.gender = gender;
        user.address = address;
        user.password = password;

        await user.save();

        return response.status(200).json({
          status: 200,
          message: "User updated successfully",
        });
      } catch (error: any) {
        return next(errorHandler(500, error.message));
      }
    }
  );

  updateFullUserById = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      const { name,email, password, role, phone, gender, address } = request.body;
      const  id  = request.params.id;

      try {
        const user = await User.findById(id);

        if (!user) {
          return next(errorHandler(400, "User not found"));
        }

        user.name = name;
        user.role = role;
        user.phone = phone;
        user.email = email;
        user.gender = gender;
        user.address = address;
        user.password = password;

        await user.save();

        return response.status(200).json({
          status: 200,
          message: "User updated successfully",
        });
      } catch (error: any) {
        return next(errorHandler(500, error.message));
      }
    }
  );

  updateUserById = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      const { name } = request.body;
      const  id  = request.params.id;

      try {
        const user = await User.findById(id);

        if (!user) {
          return next(errorHandler(400, "User not found"));
        }

        user.name = name;

        await user.save();

        return response.status(200).json({
          status: 200,
          message: "User updated successfully",
        });
      } catch (error: any) {
        return next(errorHandler(500, error.message));
      }
    }
  );

  updateUser = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      const { name } = request.body;
      const  id  = request.user?._id;

      try {
        const user = await User.findById(id);

        if (!user) {
          return next(errorHandler(400, "User not found"));
        }

        user.name = name;

        await user.save();

        return response.status(200).json({
          status: 200,
          message: "User updated successfully",
        });
      } catch (error: any) {
        return next(errorHandler(500, error.message));
      }
    }
  );

  updateUserPassword = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      const id = request.user?._id;
      const { password } = request.body;

      try {
        const user = await User.findById(id);

        if (!user) {
          return next(errorHandler(400, "User not found"));
        }

        user.password = password;

        await user.save();

        return response.status(200).json({
          status: 200,
          message: "User updated successfully",
        });
      } catch (error: any) {
        return next(errorHandler(500, error.message));
      }
    }
  );

  updateUserPasswordById = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      const id = request.params.id;
      const { password } = request.body;

      try {
        const user = await User.findById(id);

        if (!user) {
          return next(errorHandler(400, "User not found"));
        }

        user.password = password;

        await user.save();

        return response.status(200).json({
          status: 200,
          message: "User updated successfully",
        });
      } catch (error: any) {
        return next(errorHandler(500, error.message));
      }
    }
  );

  deleteUser = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      const { id } = request.params;

      try {
        const user = await User.findById(id);

        if (!user) {
          return next(errorHandler(400, "User not found"));
        }

        await User.deleteOne({ _id: user._id });

        return response.status(200).json({
          status: 200,
          message: "User deleted successfully",
        });
      } catch (error: any) {
        return next(errorHandler(500, error.message));
      }
    }
  );

  deleteUserById = asyncHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
      const { id } = request.params;

      try {
        const user = await User.findById(id);

        if (!user) {
          return next(errorHandler(400, "User not found"));
        }

        await User.deleteOne({ _id: user._id });

        return response.status(200).json({
          status: 200,
          message: "User deleted successfully",
        });
      } catch (error: any) {
        return next(errorHandler(500, error.message));
      }
    }
  );
}

export default userController;
