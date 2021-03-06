/* eslint-disable camelcase */
import { injectable, inject } from "tsyringe";

import AppError from '@shared/errors/AppError'
import IUserRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User'

interface Request {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) { }

    public async execute({ user_id }: Request): Promise<User> {
        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        };

        return user;
    };
}

export default ShowProfileService
