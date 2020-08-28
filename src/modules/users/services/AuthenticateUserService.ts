import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import authConfig from '@config/auth'
import User from '@models/User'
import AppError from '@errors/AppError'

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User,
  token: string
}

class AuthenthicateUserService {
  public async execute ({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ where: { email } })

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
