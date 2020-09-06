import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';

describe('AuthenticateUserService', () => {
    it('should be able to authenticate a user', async () => {
        const fakeUserRepository = new UsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(
            fakeUserRepository, fakeHashProvider
        );

        const authUserService = new AuthenticateUserService(
            fakeUserRepository, fakeHashProvider
        );

        const user = await createUserService.execute({
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
        const fakeUserRepository = new UsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(
            fakeUserRepository, fakeHashProvider
        );

        const authUserService = new AuthenticateUserService(
            fakeUserRepository, fakeHashProvider
        );

        await createUserService.execute({
            name: 'Guilherme Oliveira',
            email: 'guilherme.ferreira@recrutei.com.br',
            password: '123123123'
        });

        expect(authUserService.execute({
            email: 'guilherme.ferreira@recrutei.com.br',
            password: 'fkajdkflad'
        })).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to authenticate if inexistent user', async () => {
        const fakeUserRepository = new UsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authUserService = new AuthenticateUserService(
            fakeUserRepository, fakeHashProvider
        );

        expect(authUserService.execute({
            email: 'guilherme.ferreira@recrutei.com.br',
            password: '123123123'
        })).rejects.toBeInstanceOf(AppError);
    });
});
