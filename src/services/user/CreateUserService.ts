import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User from '@models/User'

interface Request {
  name: string,
  email: string,
  password: string,
}

class CreateUserService {
  public async execute ({ name, email, password }: Request): Promise<User> {
    const repository = getRepository(User)

    const exists = await repository.findOne({
      where: { email }
    })

    if (exists) {
      throw new Error('Email address already used.')
    }

    const passwordHash = await hash(password, 8)

    const user = repository.create({
      name,
      email,
      password: passwordHash
    })

    await repository.save(user)

    return user
  }
}

export default CreateUserService
