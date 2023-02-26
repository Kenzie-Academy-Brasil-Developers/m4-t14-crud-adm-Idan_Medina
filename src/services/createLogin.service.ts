import { QueryConfig } from "pg";
import { iLoginRequest } from "../interfaces/login.interfaces";
import { client } from "../database";
import { AppError } from "../errors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserResultPswd } from "../interfaces";
import "dotenv/config";

const createLoginService = async (data: iLoginRequest): Promise<string> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [data.email],
  };

  const queryResult: UserResultPswd = await client.query(queryConfig);

  if (queryResult.rowCount === 0 || !queryResult.rows[0].active) {
    throw new AppError("Wrong email/password", 401);
  }

  const pwdMatch: boolean = await compare(
    data.password,
    queryResult.rows[0].password
  );

  if (!pwdMatch) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { admin: queryResult.rows[0].admin },
    process.env.SECRET_KEY!,
    { expiresIn: "24h", subject: queryResult.rows[0].id.toString() }
  );

  return token;
};

export default createLoginService;
