import SendForgotPasswordEmail from './SendForgotPasswordEmailService';
import UsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: UsersRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new UsersRepository();
        fakeUserTokensRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
            fakeHashProvider
        );
    });

    it('should be able to  reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Guilherme Oliveira',
            email: "guilhermefos.developer@gmail.com",
            password: '1123123'
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordService.execute({
            password: "lfkafalfkafa",
            token
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('lfkafalfkafa');
        expect(updatedUser?.password).toBe('lfkafalfkafa');
    });

    it('should not be able to reset the password with non-existing token', async () => {
        await expect(
            resetPasswordService.execute({
                token: 'non-existing-token',
                password: '12345'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password with non-existing user', async () => {
        const { token } = await fakeUserTokensRepository.generate(
            'non-existing-user'
        );

        await expect(
            resetPasswordService.execute({
                token,
                password: '12345'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to  reset the password if passed more thant 2 hours', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Guilherme Oliveira',
            email: "guilhermefos.developer@gmail.com",
            password: '1123123'
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(resetPasswordService.execute({
            password: "lfkafalfkafa",
            token
        }),
        ).rejects.toBeInstanceOf(AppError);
    });
});