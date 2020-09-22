import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';

let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let userRepository: UsersRepository;

describe('CreateUserService', () => {
    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider();

        userRepository = new UsersRepository();

        createUserService = new CreateUserService(
            userRepository, fakeHashProvider
        );
    });

    it('should be able to create a new User', async () => {
        const user = await createUserService.execute({
            name: 'Guilherme Oliveira',
            email: 'guilherme.ferreira@recrutei.com.br',
            password: '123123123'
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with a existed email', async () => {
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
