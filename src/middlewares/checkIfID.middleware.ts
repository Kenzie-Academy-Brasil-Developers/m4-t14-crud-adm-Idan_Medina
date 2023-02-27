import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const checkIfId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const query: string = `
          SELECT
              *
          FROM
              users
          WHERE
              id= $1;
      `;

  const queryConfig: QueryConfig = {
    text: query,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);
  if (queryResult.rows.length === 0) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  return next();
};

export default checkIfId;
