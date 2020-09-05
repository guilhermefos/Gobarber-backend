import { container } from 'tsyringe';

import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IAppoitmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
    'UserRepository',
    UserRepository
);