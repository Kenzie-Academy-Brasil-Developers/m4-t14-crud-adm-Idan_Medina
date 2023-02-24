import { QueryResult } from "pg";

interface iUserRequest {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
}

interface iUserResponse extends iUserRequest {
  id: number;
}

type UserWithNoPassword = Omit<iUserResponse, "password">;
type UserResult = QueryResult<UserWithNoPassword>;

export { iUserRequest, iUserResponse, UserWithNoPassword, UserResult };
