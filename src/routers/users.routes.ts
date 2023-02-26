import { Router } from "express";
import { createUserController, readUsersController } from "../controllers/users.controllers";
import { checkAdminStatus, checkBodyRequest, checkIfEmail, checkToken } from "../middlewares";
import { createUserSchema } from "../schemas/users.schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  checkBodyRequest(createUserSchema),
  checkIfEmail,
  createUserController
);
userRoutes.get("", checkToken, checkAdminStatus, readUsersController);

export default userRoutes;
