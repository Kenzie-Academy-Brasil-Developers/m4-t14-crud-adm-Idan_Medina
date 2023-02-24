import format from "pg-format";
import { client } from "../database";
import { iUserRequest, UserResult, UserWithNoPassword } from "../interfaces";
import { returnUserSchema } from "../schemas/users.schema";

const createUsersService = async (
  data: iUserRequest
): Promise<UserWithNoPassword> => {
  const queryTemplate: string = format(
    `
            INSERT INTO
                users(%I)
            VALUES(%L)
            RETURNING id, name, email, admin, active
        `,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: UserResult = await client.query(queryTemplate);

  const createUser: UserWithNoPassword = returnUserSchema.parse(
    queryResult.rows[0]
  );

  return createUser;
};

export default createUsersService;
