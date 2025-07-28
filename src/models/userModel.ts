
import { config } from "@/config/config";
import { type IUser } from "@/types/userTypes";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Schema, model } from "mongoose";

// define user schema with mongoose
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    role: {
      type: String,
      enum: ["seller", "buyer", "borrower"],
      required: true,
    },
    accsesToken: {
      type: String || null,
      default: null,
    },
  },
  { timestamps: true }
);

// hash password before saving to database
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// compare password with hashed password
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// generate auth token
userSchema.methods.generateAuthToken = function (): string {
  const user = this;
  const timestamp = new Date().getTime();
  return jwt.sign({_id: user._id, timestamp }, config.secret as string);
};

// generate refresh token
userSchema.methods.generateRefreshToken = function (): string {
  const user = this;
  const timestamp = new Date().getTime();
  return jwt.sign({ _id: user._id, timestamp }, config.secret as string);
};

// create a new user with mongoose
const User = model<IUser>("User", userSchema);

export default User;
