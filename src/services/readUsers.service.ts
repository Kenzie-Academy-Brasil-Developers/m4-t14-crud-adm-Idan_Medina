import { QueryConfig } from "pg";
import { client } from "../database";
import { ListUser, UserResult, UserWithNoPassword } from "../interfaces";
import { readUsersSchema, returnUserSchema } from "../schemas/users.schemas";

const readUsersService = async (): Promise<ListUser> => {
  const queryString: string = `
            SELECT
              *
            FROM
              users
        `;
  const queryResult = await client.query(queryString);
  const listUsers = readUsersSchema.parse(queryResult.rows);

  return listUsers;
};

const readUserService = async (id: number): Promise<UserWithNoPassword> => {
  const queryString: string = `
            SELECT
              *
            FROM
              users
            WHERE
              id = $1
        `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: UserResult = await client.query(queryConfig);

  const readUser = returnUserSchema.parse(queryResult.rows[0]);

  return readUser;
};

export { readUsersService, readUserService };
