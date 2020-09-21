import "reflect-metadata";

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
    it('should be able to add a new user avatar', async () => {
        const fakeUserRepository = new UsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUserRepository, fakeStorageProvider
        );

        const user = await fakeUserRepository.create({
            name: 'Guilherme Oliveira',
            email: 'guilherme.ferreira@recrutei.com.br',
            password: '123123123'
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFileName: 'avatar.png'
        })

        expect(user.avatar).toBe('avatar.png');
    });
    it('should be able to delete a avatar', async () => {
        const fakeUserRepository = new UsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUserRepository, fakeStorageProvider
        );

        const user = await fakeUserRepository.create({
            name: 'Guilherme Oliveira',
            email: 'guilherme.ferreira@recrutei.com.br',
            password: '123123123'
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFileName: 'avatar.png'
        })

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.png'
        })

        expect(deleteFile).toHaveBeenCalledWith('avatar.png');

        expect(user.avatar).toBe('avatar2.png');
    });
    it('should not be able to add a avatar if user not exist', async () => {
        const fakeUserRepository = new UsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUserRepository, fakeStorageProvider
        );

        await expect(updateUserAvatarService.execute({
            user_id: 'not-exist',
            avatarFileName: 'avatar.png'
        })).rejects.toBeInstanceOf(AppError);
    });
});
