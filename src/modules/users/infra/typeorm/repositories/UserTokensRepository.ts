import { getRepository, Repository } from 'typeorm'

import IUserTokensRepository from '../../../repositories/IUserTokensRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

import UserToken from '../../typeorm/entities/UserToken';

class UsersTokensRepository implements IUserTokensRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.repository.findOne({
            where: { token }
        });

        return userToken;
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = this.repository.create({
            user_id,
        });

        await this.repository.save(userToken);

        return userToken;
    }

}

export default UsersTokensRepository
