import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';

describe('CreateUserService', () => {
    it('should be able to create a new User', async () => {
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(
            new UsersRepository(), fakeHashProvider
        );

        const user = await createUserService.execute({
            name: 'Guilherme Oliveira',
            email: 'guilherme.ferreira@recrutei.com.br',
            password: '123123123'
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with a existed email', async () => {
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(
            new UsersRepository(), fakeHashProvider
        );

        await createUserService.execute({
            name: 'Guilherme Oliveira',
            email: 'guilherme.ferreira@recrutei.com.br',
            password: '123123123'
        });

        await expect(createUserService.execute({
            name: 'Guilherme Oliveira',
            email: 'guilherme.ferreira@recrutei.com.br',
            password: '123123123'
        }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
