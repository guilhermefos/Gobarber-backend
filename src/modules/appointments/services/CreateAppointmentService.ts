import { startOfHour, isBefore, getHours, format, parse } from 'date-fns'
import "reflect-metadata"

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError'
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentRepository from '../repositories/IAppointmentsRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request {
  provider_id: string,
  user_id: string,
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private repository: AppointmentRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { };

  public async execute({ provider_id, user_id, date }: Request): Promise<Appointment> {
    const parsedDate = startOfHour(date);

    if (isBefore(parsedDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself");
    }

    if (await this.repository.findByDate(parsedDate)) {
      throw new AppError('This appointment is already booked');
    }

    if (getHours(parsedDate) < 8 || getHours(parsedDate) > 17) {
      throw new AppError("You can only create appointments between 8am and 5pm");
    }

    const appointment = await this.repository.create({
      provider_id,
      user_id,
      date: parsedDate
    });

    const dateFormatted = format(parsedDate, "dd/MM/yyyy 'às' HH:mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormatted}`
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        parsedDate,
        'yyyy-M-d'
      )}`
    );

    return appointment;
  };
}

export default CreateAppointmentService
