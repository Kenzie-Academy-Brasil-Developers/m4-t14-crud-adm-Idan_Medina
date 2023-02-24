import { Router } from "express";
import createUserController from "../controllers/users.controller";
import { checkIfEmail } from "../middlewares";

const userRoutes: Router = Router();

userRoutes.post("", checkIfEmail, createUserController);

export default userRoutes;
