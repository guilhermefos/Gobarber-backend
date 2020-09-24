import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers'

import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository'

container.registerSingleton<IAppoitmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
    'UserRepository',
    UserRepository
);

container.registerSingleton<IHashProvider>(
    'HashProvider',
    HashProvider
);

container.registerSingleton<IUsersTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository
);

container.registerSingleton<INotificationsRepository>(
    'NotificationsRepository',
    NotificationsRepository
);