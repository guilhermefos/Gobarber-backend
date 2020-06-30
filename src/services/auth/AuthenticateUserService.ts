import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
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

    const token = sign({}, 'dbc56710b8517f0ba66170a1d19b59d9', {
      subject: user.id,
      expiresIn: '1d'
    })

    return { user, token }
  }
}

export default AuthenthicateUserService
