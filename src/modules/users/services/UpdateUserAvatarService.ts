/* eslint-disable camelcase */
import path from 'path'
import fs from 'fs'
import { injectable, inject } from "tsyringe";

import IUserRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

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
    private repository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.repository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated user can change avatar', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName

    await this.repository.save(user)

    return user
  };
}

export default UpdateUserAvatarService
