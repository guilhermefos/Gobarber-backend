/* eslint-disable camelcase */
import path from 'path'
import fs from 'fs'
import { injectable, inject } from "tsyringe";

import IUserRepository from '../repositories/IUsersRepository';

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'

interface Request {
  user_id: string
  avatarFileName: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository
  ) { }

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.repository.findById(user_id)

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

    await this.repository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
