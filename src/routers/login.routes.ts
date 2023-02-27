import { Router } from "express";
import { createLoginController } from "../controllers/login.controller";
import { checkBodyRequest } from "../middlewares";
import { createLoginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  checkBodyRequest(createLoginSchema),
  createLoginController
);

export default loginRoutes;
