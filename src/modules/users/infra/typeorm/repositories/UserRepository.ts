import { getRepository, Repository, Not } from 'typeorm'

import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '../../typeorm/entities/User';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    public async findAllProviders({ id }: IFindAllProvidersDTO): Promise<User[]> {
        let users: User[];

        if (id) {
            users = await this.repository.find({
                where: {
                    id: Not(id),
                }
            });
        } else {
            users = await this.repository.find();
        }

        return users;
    }

    public async findById(id: string): Promise<User | undefined> {
        return await this.repository.findOne(id);
    };

    public async findByEmail(email: string): Promise<User | undefined> {
        return await this.repository.findOne({
            where: { email }
        });
    };

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = this.repository.create(userData);

        await this.repository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.repository.save(user);
    }
}

export default UsersRepository
