import { Request, Response } from "express";
import { iUserRequest } from "../interfaces";
import { createUserSchema } from "../schemas/users.schema";
import { createUsersService } from "../services";

const createUserController = async (req: Request, res: Response): Promise<Response> => {

    const userData: iUserRequest = req.body 
    const checkData = createUserSchema.parse(userData)
    const createUser = await createUsersService(checkData)

    return res.status(201).json(createUser)
}

export default createUserController
