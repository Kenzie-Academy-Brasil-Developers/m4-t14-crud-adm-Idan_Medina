import { Router } from "express";
import {
  createUserController,
  readUsersController,
  readUserController,
  updateUserController,
  deleteUserController,
  recoverUserController,
} from "../controllers/users.controllers";
import {
  checkAdminStatus,
  checkBodyRequest,
  checkIfEmail,
  checkIfID,
  checkToken,
} from "../middlewares";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  checkBodyRequest(createUserSchema),
  checkIfEmail,
  createUserController
);
userRoutes.get("", checkToken, checkAdminStatus, readUsersController);
userRoutes.get("/profile", checkToken, readUserController);
userRoutes.patch(
  "/:id",
  checkToken,
  checkIfID,
  checkBodyRequest(updateUserSchema),
  updateUserController
);
userRoutes.put(
  "/:id/recover",
  checkToken,
  checkAdminStatus,
  checkIfID,
  recoverUserController
);
userRoutes.delete("/:id", checkToken, checkIfID, deleteUserController);

export default userRoutes;
