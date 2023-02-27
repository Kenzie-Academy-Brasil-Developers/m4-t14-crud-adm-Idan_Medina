import { Request, Response } from "express";
import { iUserRequest, iUserUpdate } from "../interfaces";
import {
  createUserService,
  readUserService,
  readUsersService,
  recoverUserService,
  updateUserService,
  deleteUserService,
} from "../services";

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

const readUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = req.user.id;
  const user = await readUserService(id);

  return res.status(200).json(user);
};

const recoverUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  const recoverUser = await recoverUserService(id);

  return res.status(200).json(recoverUser);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: iUserUpdate = req.body;
  const userId: number = req.user.id;
  const id: number = Number(req.params.id);
  const userAdmin: boolean = req.user.admin;

  if (!userAdmin) {
    if (userId !== id) {
      return res.status(403).json({
        message: "Insufficient Permission",
      });
    }
  }

  const updateUser = await updateUserService(data, id);

  return res.status(200).json(updateUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = req.user.id;
  const id: number = Number(req.params.id);
  const userAdmin: boolean = req.user.admin;

  if (!userAdmin) {
    if (userId !== id) {
      return res.status(403).json({
        message: "Insufficient Permission",
      });
    }
  }

  await deleteUserService(id);

  return res.status(204).send();
};

export {
  createUserController,
  readUsersController,
  readUserController,
  recoverUserController,
  updateUserController,
  deleteUserController,
};
