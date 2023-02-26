import { Request, Response } from "express";
import { iLoginRequest } from "../interfaces";
import { createLoginService } from "../services";

const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: iLoginRequest = req.body;
  const token = await createLoginService(user);
  return res.json({ token: token });
};

export { createLoginController };
