import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const checkBodyRequest =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const check = schema.parse(req.body);
    req.body = check;

    return next();
  };

export default checkBodyRequest;
