import { returnUserSchema, updateUserSchema } from "../schemas/users.schemas";
import {
  iUserUpdate,
  UserResultPatch,
  UserResultUpdate,
  UserWithNoPassword,
} from "../interfaces/users.interfaces";
import format from "pg-format";
import { client } from "../database";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../errors";

const updateUserService = async (
  data: iUserUpdate,
  id: number
): Promise<UserWithNoPassword> => {
  const queryTemplate: string = format(
    `
              UPDATE
                users
              SET(%I) = ROW(%L)
              WHERE
                id = $1
              RETURNING *;
          `,
    Object.keys(data),
    Object.values(data)
  );
  let queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [id],
  };
  const queryResultToUpdate: UserResultUpdate = await client.query(queryConfig);

  updateUserSchema.parse(queryResultToUpdate);

  const queryString: string = `
            SELECT
              *
            FROM
              users
            WHERE
              id = $1
        `;
  queryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: UserResultPatch = await client.query(queryConfig);

  const updateUser: UserWithNoPassword = returnUserSchema.parse(
    queryResult.rows[0]
  );

  return updateUser;
};

const recoverUserService = async (id: number): Promise<UserWithNoPassword> => {
  let queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1
    `;
  let queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  let queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rows[0].active) {
    throw new AppError("User already active", 400);
  }

  queryString = `
                UPDATE
                    users
                SET
                    active = true
                WHERE
                    id = $1
                RETURNING *;
            `;
  queryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);

  queryString = `
            SELECT
              *
            FROM
              users
            WHERE
              id = $1
        `;
  queryConfig = {
    text: queryString,
    values: [id],
  };

  queryResult = await client.query(queryConfig);

  const recoverUser: UserWithNoPassword = returnUserSchema.parse(
    queryResult.rows[0]
  );

  return recoverUser;
};

export { updateUserService, recoverUserService };
