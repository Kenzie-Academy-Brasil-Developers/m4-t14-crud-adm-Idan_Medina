import { client } from "../database";
import { ListUser } from "../interfaces";
import { readUsersSchema } from "../schemas/users.schemas";

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

export default readUsersService;
