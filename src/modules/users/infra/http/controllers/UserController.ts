import { Request, Response } from 'express';
import { container } from "tsyringe";
import { classToClass } from "class-transformer";
import CreateUserService from '../../../services/CreateUserService'

export default class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        const userService = container.resolve(CreateUserService)

        const user = await userService.execute({ ...request.body })

        return response.json(classToClass(user))
    }
}