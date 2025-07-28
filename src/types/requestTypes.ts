import type { Request } from "express";
import type { IUser } from "./userTypes";

export interface IRequest extends Request {
  user?: IUser;
}
