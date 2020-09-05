import { Request, Response } from 'express';
import { container } from "tsyringe";

import AuthenticateUserService from '../../../services/AuthenticateUserService'

export default class SessionController {
    public async create(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(AuthenticateUserService);

        const { user, token } = await service.execute({ ...request.body })

        delete user.password

        return response.json({ user, token })
    }
}