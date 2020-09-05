import { hash } from 'bcryptjs'
import { injectable, inject } from "tsyringe";

import AppError from '@shared/errors/AppError'
import IUserRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User'

interface Request {
  name: string,
  email: string,
  password: string,
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository
  ) { }

  public async execute({ name, email, password }: Request): Promise<User> {
    const exists = await this.repository.findByEmail(email);

    if (exists) {
      throw new AppError('Email address already used.')
    }

    const passwordHash = await hash(password, 8)

    return await this.repository.create({
      name,
      email,
      password: passwordHash
    });
  }
}

export default CreateUserService
