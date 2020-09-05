import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { injectable, inject } from "tsyringe";

import IUserRepository from '../repositories/IUsersRepository';

import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User,
  token: string
}

@injectable()
class AuthenthicateUserService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository
  ) { }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    const matchPassword = await compare(password, user.password)

    if (!matchPassword) {
      throw new AppError('Invalid credentials')
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return { user, token }
  }
}

export default AuthenthicateUserService
