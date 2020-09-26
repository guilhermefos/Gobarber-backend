import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';

let fakeUserRepository: UsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authUserService: AuthenticateUserService;

describe('AuthenticateUserService', () => {
    beforeEach(() => {
        fakeUserRepository = new UsersRepository();

        fakeHashProvider = new FakeHashProvider();

        authUserService = new AuthenticateUserService(
            fakeUserRepository, fakeHashProvider
        );

    });

    it('should be able to authenticate a user', async () => {
        const user = await fakeUserRepository.create({
            name: 'Guilherme Oliveira',
            email: 'guilherme.ferreira@recrutei.com.br',
            password: '123123123'
        });

        const response = await authUserService.execute({
            email: 'guilherme.ferreira@recrutei.com.br',
            password: '123123123'
        })

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });
    it('should not be able to authenticate a user with wrong password', async () => {
        await fakeUserRepository.create({
            name: 'Guilherme Oliveira',
            email: 'guilherme.ferreira@recrutei.com.br',
            password: '123123123'
        });

        await expect(authUserService.execute({
            email: 'guilherme.ferreira@recrutei.com.br',
            password: 'fkajdkflad'
        })).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to authenticate if inexistent user', async () => {
        await expect(authUserService.execute({
            email: 'guilherme.ferreira@recrutei.com.br',
            password: '123123123'
        })).rejects.toBeInstanceOf(AppError);
    });
});
