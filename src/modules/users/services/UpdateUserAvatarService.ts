/* eslint-disable camelcase */
import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'

import AppError from '@errors/AppError'
import uploadConfig from '@config/upload'
import User from '@models/User'

interface Request {
  user_id: string
  avatarFileName: string
}

class UpdateUserAvatarService {
  public async execute ({ user_id, avatarFileName }: Request): Promise<User> {
    const repository = getRepository(User)

    const user = await repository.findOne(user_id)

    if (!user) {
      throw new AppError('Only authenticated user can change avatar', 401)
    }

    if (user.avatar) {
      const filePath = path.join(uploadConfig.directory, user.avatar)
      const fileExist = await fs.promises.stat(filePath)

      if (fileExist) {
        await fs.promises.unlink(filePath)
      }
    }

    user.avatar = avatarFileName

    await repository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
