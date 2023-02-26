import { QueryResult } from "pg";
import { z } from "zod";
import {
  userSchema,
  createUserSchema,
  returnUserSchema,
  updateUserSchema,
  readUsersSchema,
} from "../schemas/users.schemas";

type iUserRequest = z.infer<typeof createUserSchema>;
type iUserResponse = z.infer<typeof userSchema>;
type iUserUpdate = z.infer<typeof updateUserSchema>;

type UserWithNoPassword = z.infer<typeof returnUserSchema>;
type ListUser = z.infer<typeof readUsersSchema>;
type UserResult = QueryResult<UserWithNoPassword>;
type UserResultPswd = QueryResult<iUserResponse>;

export {
  iUserRequest,
  iUserResponse,
  iUserUpdate,
  UserWithNoPassword,
  ListUser,
  UserResult,
  UserResultPswd,
};
