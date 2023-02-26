import { Request, Response } from "express";
import { iUserRequest } from "../interfaces";
import { createUserService, readUsersService } from "../services";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: iUserRequest = req.body;
  const createUser = await createUserService(userData);

  return res.status(201).json(createUser);
};

const readUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const usersList = await readUsersService();
  
  return res.status(200).json(usersList);
};

export { createUserController, readUsersController };
