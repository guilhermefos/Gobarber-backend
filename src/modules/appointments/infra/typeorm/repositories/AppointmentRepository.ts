import { getRepository, Repository } from 'typeorm'

import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';
import ICreateAppoitmentDTO from '../../../dtos/ICreateAppoitmentDTO';

import Appointment from '../../typeorm/entities/Appointment';

class AppointmentRepository implements IAppointmentsRepository {
  private repository: Repository<Appointment>;

  constructor() {
    this.repository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.repository.findOne({
      where: { date }
    })

    return appointment || null
  }

  public async create({ provider_id, date }: ICreateAppoitmentDTO): Promise<Appointment> {
    const appointment = this.repository.create({ provider_id, date });

    await this.repository.save(appointment);

    return appointment;
  }
}

export default AppointmentRepository
