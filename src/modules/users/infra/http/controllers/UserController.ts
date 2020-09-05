import { Request, Response } from 'express';
import { container } from "tsyringe";
import CreateUserService from '../../../services/CreateUserService'

export default class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        const userService = container.resolve(CreateUserService)

        const user = await userService.execute({ ...request.body })

        delete user.password

        return response.json(user)
    }
}