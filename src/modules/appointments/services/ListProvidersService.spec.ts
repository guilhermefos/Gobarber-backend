import "reflect-metadata";

import UsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

import AppError from '@shared/errors/AppError';

let fakeCacheProvider: FakeCacheProvider;
let fakeUserRepository: UsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders ', () => {
    beforeEach(() => {
        fakeUserRepository = new UsersRepository();

        fakeCacheProvider = new FakeCacheProvider();

        listProvidersService = new ListProvidersService(
            fakeUserRepository,
            fakeCacheProvider
        );
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUserRepository.create({
            name: "John One",
            email: "johnone@example.com",
            password: "123456"
        });

        const user2 = await fakeUserRepository.create({
            name: "John Two",
            email: "johntwo@example.com",
            password: "123456"
        });

        const user3 = await fakeUserRepository.create({
            name: "John Three",
            email: "johnthree@example.com",
            password: "123456"
        });

        const loggedUser = await fakeUserRepository.create({
            name: "John Four",
            email: "johnfour@example.com",
            password: "123456"
        });

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id
        });

        expect(providers).toEqual([user1, user2, user3]);
    });
});

