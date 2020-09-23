import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../../appointments/repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

let createAppointmentService: CreateAppointmentService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();

        createAppointmentService = new CreateAppointmentService(
            fakeAppointmentRepository
        );
    });

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createAppointmentService.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: '123123',
            provider_id: '1349fa24'
        });

        expect(appointment).toHaveProperty('id');
    });

    it('should not be able to create two appointments with the same date', async () => {
        const date = new Date();

        const appointment = await createAppointmentService.execute({
            date,
            user_id: '123123',
            provider_id: '1349fa24'
        });

        await expect(createAppointmentService.execute({
            date: appointment.date,
            user_id: '123123',
            provider_id: '12fadfa3143'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a appointments on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointmentService.execute({
                date: new Date(2020, 4, 10, 11),
                user_id: '123',
                provider_id: '12fda3'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to acreate a appointment with same user as providers', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointmentService.execute({
                date: new Date(2020, 4, 10, 13),
                user_id: '123',
                provider_id: '123'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to acreate a appointment outside the available hours', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointmentService.execute({
                date: new Date(2020, 4, 11, 7),
                user_id: '123',
                provider_id: 'provider-id'
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointmentService.execute({
                date: new Date(2020, 4, 11, 18),
                user_id: '123',
                provider_id: 'provider-id'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

});