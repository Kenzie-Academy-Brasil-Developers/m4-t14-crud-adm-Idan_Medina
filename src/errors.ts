import { NextFunction, Request, Response } from "express";

class AppError extends Error {
  message: string;
  status: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.status = statusCode;
  }
}

const handleErrors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      message: error.message,
    });
  }
  console.log(error);
  return res.status(500).json({
    message: "Internal server error",
  });
};

export { AppError, handleErrors };