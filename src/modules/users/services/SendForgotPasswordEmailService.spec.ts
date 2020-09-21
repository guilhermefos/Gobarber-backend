import SendForgotPasswordEmail from './SendForgotPasswordEmailService';
import UsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';


let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: UsersRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeMailProvider = new FakeMailProvider();
        fakeUsersRepository = new UsersRepository();
        fakeUserTokensRepository = new FakeUserTokenRepository();


        sendForgotPasswordEmailService = new SendForgotPasswordEmail(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository
        );
    });

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'Guilherme Oliveira',
            email: "guilhermefos.developer@gmail.com",
            password: '1123123'
        });

        await sendForgotPasswordEmailService.execute({
            email: 'guilhermefos.developer@gmail.com'
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non existing user password', async () => {
        await expect(
            sendForgotPasswordEmailService.execute({
                email: 'guilhermefos.developer@gmail.com'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'Guilherme Oliveira',
            email: "guilhermefos.developer@gmail.com",
            password: '1123123'
        });

        await sendForgotPasswordEmailService.execute({
            email: 'guilhermefos.developer@gmail.com'
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});