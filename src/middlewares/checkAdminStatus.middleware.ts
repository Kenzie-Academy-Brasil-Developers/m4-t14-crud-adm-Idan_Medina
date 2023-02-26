import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const checkAdminStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authUser = req.user;

  if (!authUser.admin) {
    throw new AppError("Insufficient Permission", 403);
  }
  return next();
};

export default checkAdminStatus;
