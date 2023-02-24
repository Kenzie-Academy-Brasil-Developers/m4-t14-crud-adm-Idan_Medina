import { QueryResult } from "pg";

interface iUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean | undefined;
}

interface iUserResponse extends iUserRequest {
  id: number;
  active: boolean;
}

type UserWithNoPassword = Omit<iUserResponse, "password">;
type UserResult = QueryResult<UserWithNoPassword>;

export { iUserRequest, iUserResponse, UserWithNoPassword, UserResult };
