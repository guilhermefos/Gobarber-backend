import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import User from '@models/User'

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User
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

    return { user }
  }
}

export default AuthenthicateUserService
