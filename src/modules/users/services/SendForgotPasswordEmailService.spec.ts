import SendForgotPasswordEmail from './SendForgotPasswordEmailService';
import UsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using the email', async () => {
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPasswordEmailService = new SendForgotPasswordEmail(
            new UsersRepository(),
            fakeMailProvider
        );

        await sendForgotPasswordEmailService.execute({
            email: 'guilhermefos.developer@gmail.com'
        });

        expect(sendMail).toHaveBeenCalled();
    });
});