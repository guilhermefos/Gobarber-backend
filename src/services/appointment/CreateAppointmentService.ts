import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppError from '@errors/AppError'
import Appointment from '@models/Appointment'
import AppointmentRepository from '@repositories/AppointmentRepository'

interface Request {
  provider_id: string,
  date: Date
}

class CreateAppointmentService {
  public async execute ({ provider_id, date }: Request): Promise<Appointment> {
    const repository = getCustomRepository(AppointmentRepository)

    const parsedDate = startOfHour(date)

    if (await repository.findByDate(parsedDate)) {
      throw AppError('This appointment is already booked')
    }

    const appointment = repository.create({
      provider_id,
      date: parsedDate
    })

    await repository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
