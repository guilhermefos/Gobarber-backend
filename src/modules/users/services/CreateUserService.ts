import "reflect-metadata"

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request {
  name: string,
  email: string,
  password: string,
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ name, email, password }: Request): Promise<User> {
    const exists = await this.repository.findByEmail(email);

    if (exists) {
      throw new AppError('Email address already used.')
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.repository.create({
      name,
      email,
      password: passwordHash
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  };
}

export default CreateUserService
