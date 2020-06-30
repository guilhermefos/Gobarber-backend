import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import authConfig from '@config/auth'
import User from '@models/User'

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
      throw new Error('Invalid credentials')
    }

    const matchPassword = await compare(password, user.password)

    if (!matchPassword) {
      throw new Error('Invalid credentials')
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
