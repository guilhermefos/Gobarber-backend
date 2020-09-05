import { startOfHour } from 'date-fns'
import { injectable, inject } from "tsyringe";

import AppError from '@shared/errors/AppError'
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentRepository from '../repositories/IAppointmentsRepository';

interface Request {
  provider_id: string,
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private repository: AppointmentRepository
  ) { };

  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const parsedDate = startOfHour(date);

    if (await this.repository.findByDate(parsedDate)) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.repository.create({
      provider_id,
      date: parsedDate
    });

    return appointment;
  }
}

export default CreateAppointmentService
