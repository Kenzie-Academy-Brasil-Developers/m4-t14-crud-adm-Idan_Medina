import { QueryConfig } from "pg";
import { client } from "../database";

const deleteUserService = async (id: number): Promise<void> => {
  const queryString: string = `
                UPDATE
                    users
                SET
                    active = false
                WHERE
                    id = $1
                RETURNING *;
            `;
  let queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);
};

export default deleteUserService;
