import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";
import "dotenv/config";

const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }

  const auth = token.split(" ")[1];

  verify(auth, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    {
      if (error) throw new AppError(error.message, 401);
    }

    req.user = {
      id: Number(decoded.sub),
      admin: decoded.admin,
    };
    return next();
  });
};

export default checkToken;
