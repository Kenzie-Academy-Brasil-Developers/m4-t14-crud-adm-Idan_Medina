import { Request, Response } from "express";
import { iUserRequest } from "../interfaces";
import { createUsersService } from "../services";

const createUserController = async (req: Request, res: Response): Promise<Response> => {

    const userData: iUserRequest = req.body

    const createUser = await createUsersService(userData)

    return res.status(201).json(createUser)
}

export default createUserController
