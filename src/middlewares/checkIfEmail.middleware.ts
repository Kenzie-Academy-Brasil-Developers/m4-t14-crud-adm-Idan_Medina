import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";

const checkIfEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const queryString: string = `
    SELECT
      *
    FROM
      users
    WHERE
      email = $1
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.body.email],
  };
  const queryResultCheck: QueryResult = await client.query(queryConfig);
  console.log(queryResultCheck);
  if (queryResultCheck.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};

export default checkIfEmail;
