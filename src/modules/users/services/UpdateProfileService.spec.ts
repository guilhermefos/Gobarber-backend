import "reflect-metadata";

import UsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '../services/UpdateProfileService';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: UsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfieService: UpdateProfileService;

describe('UpdateProfileService', () => {
    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider();
        fakeUserRepository = new UsersRepository();

        updateProfieService = new UpdateProfileService(
            fakeUserRepository, fakeHashProvider
        );
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUserRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456"
        });

        const updatedUser = await updateProfieService.execute({
            user_id: user.id,
            name: "John Tre",
            email: "johntre@example.com"
        });

        expect(updatedUser.name).toBe("John Tre");
        expect(updatedUser.email).toBe("johntre@example.com");
    });

    it('should not be able to update the email if exits any email with the same value', async () => {
        await fakeUserRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456"
        });

        const user = await fakeUserRepository.create({
            name: "Juca Master",
            email: "jucamaster@example.com",
            password: "123456"
        });

        await expect(updateProfieService.execute({
            user_id: user.id,
            name: "Juca Loreto",
            email: "johndoe@example.com"
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUserRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "12345678"
        });

        await expect(updateProfieService.execute({
            user_id: user.id,
            name: "John Tre",
            email: "johntre@example.com",
            password: "123456",
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUserRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "12345678"
        });

        await expect(updateProfieService.execute({
            user_id: user.id,
            name: "John Tre",
            email: "johntre@example.com",
            password: "123456",
            old_password: "flajfalk"
        })).rejects.toBeInstanceOf(AppError);
    });
});

