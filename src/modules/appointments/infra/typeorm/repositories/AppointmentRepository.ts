import { getRepository, Repository, Raw } from 'typeorm'

import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';
import ICreateAppoitmentDTO from '../../../dtos/ICreateAppoitmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

import Appointment from '../../typeorm/entities/Appointment';

class AppointmentRepository implements IAppointmentsRepository {
  private repository: Repository<Appointment>;

  constructor() {
    this.repository = getRepository(Appointment);
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parseMonth = String(month).padStart(2, '0');

    const appointments = await this.repository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parseMonth}-${year}'`
        )
      },

    })
    return appointments;
  };

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
