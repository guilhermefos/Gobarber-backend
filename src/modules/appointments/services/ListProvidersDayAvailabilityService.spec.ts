import "reflect-metadata";

import UsersRepository from '@modules/users/repositories/fakes/UsersRepository';
import ListProvidersDayAvailabilityService from './ListProvidersDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProvidersDayAvailabilityService;

describe('ListProviderDayAvailability ', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProvidersDayAvailabilityService(fakeAppointmentsRepository);
    });

    it('should be able to list the day availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 105, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 20, 11).getTime();
        });

        const availability = listProviderDayAvailability.execute({
            provider_id: 'user',
            day: 20,
            year: 2020,
            month: 5
        });

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: false },
            { hour: 10, available: false },
            { hour: 13, available: true },
            { hour: 14, available: false },
            { hour: 15, available: false },
            { hour: 16, available: true },
        ]));

    });
});

