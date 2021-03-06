import { uuid } from "uuidv4";
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
    private users: User[] = [];


    public async findAllProviders({ id }: IFindAllProvidersDTO): Promise<User[]> {
        let users = this.users;

        if (id) {
            users = this.users.filter(usr => usr.id !== id);
        };

        return users;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(user => user.id === id);

        return user;
    };

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.email === email);

        return user;
    };

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid(), ...userData });

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const index = this.users.findIndex(usr => usr.id === user.id);

        this.users[index] = user;

        return user;
    }
}

export default UsersRepository
