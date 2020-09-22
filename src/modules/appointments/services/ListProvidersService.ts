/* eslint-disable camelcase */
import { injectable, inject } from "tsyringe";

import IUserRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User'

interface Request {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) { }

    public async execute({ user_id }: Request): Promise<User[]> {
        const users = await this.userRepository.findAllProviders({
            id: user_id
        });

        return users;
    };
}

export default ListProvidersService
