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
        const appointment = await createAppointmentService.execute({
            date: new Date(),
            provider_id: '134924'
        });

        expect(appointment).toHaveProperty('id');
    });

    it('should not be able to create two appointments with the same date', async () => {
        const date = new Date();

        const appointment = await createAppointmentService.execute({
            date,
            provider_id: '134924'
        });

        await expect(createAppointmentService.execute({
            date: appointment.date,
            provider_id: '123143'
        })).rejects.toBeInstanceOf(AppError);
    });
});