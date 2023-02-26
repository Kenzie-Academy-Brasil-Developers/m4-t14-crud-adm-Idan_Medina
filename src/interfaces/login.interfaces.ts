import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schemas";

type iLoginRequest = z.infer<typeof createLoginSchema>;

export { iLoginRequest };
