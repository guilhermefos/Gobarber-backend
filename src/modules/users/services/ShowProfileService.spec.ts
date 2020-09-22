import "reflect-metadata";

import UsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import ShowProfileService from '../services/ShowProfileService';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: UsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
    beforeEach(() => {
        fakeUserRepository = new UsersRepository();
        showProfileService = new ShowProfileService(fakeUserRepository);
    });

    it('should be able to show the profile user', async () => {
        const user = await fakeUserRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456"
        });

        const findedUser = await showProfileService.execute({
            user_id: user.id
        });

        expect(findedUser.id).toBe(user.id);
    });

    it('should not be able to show a non-existing profile user', async () => {
        await expect(showProfileService.execute({
            user_id: 'non-existing-user-id'
        })).rejects.toBeInstanceOf(AppError);
    });
});

