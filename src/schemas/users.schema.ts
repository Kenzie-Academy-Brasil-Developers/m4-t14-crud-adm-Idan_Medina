import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(20),
  email: z.string().email().max(100),
  password: z.string().min(4).max(120),
  admin: z.boolean(),
  active: z.boolean(),
});

const createUserSchema = userSchema
  .partial({
    admin: true,
  })
  .omit({ id: true, active: true });

const returnUserSchema = userSchema.omit({ password: true });

export { userSchema, createUserSchema, returnUserSchema };
