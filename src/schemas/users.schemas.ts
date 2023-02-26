import { z } from "zod";
import { hashSync } from "bcryptjs";

const userSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(20),
  email: z.string().email().max(100),
  password: z
    .string()
    .min(4)
    .max(120)
    .transform((password) => {
      return hashSync(password, 10);
    }),
  admin: z.boolean(),
  active: z.boolean(),
});

const createUserSchema = userSchema
  .partial({
    admin: true,
  })
  .omit({ id: true, active: true });

const returnUserSchema = userSchema.omit({ password: true });

const updateUserSchema = userSchema
  .partial()
  .omit({ id: true, admin: true, active: true });

const readUsersSchema = z.array(returnUserSchema);

export {
  userSchema,
  createUserSchema,
  returnUserSchema,
  updateUserSchema,
  readUsersSchema,
};
