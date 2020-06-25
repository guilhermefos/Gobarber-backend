import { startOfHour } from 'date-fns'
import Appointment from '@models/Appointment'
import AppointmentRepository from '@repositories/AppointmentRepository'

interface Request {
  provider: string,
  date: Date
}

class CreateAppointmentService {
  private repository: AppointmentRepository

  constructor (repository: AppointmentRepository) {
    this.repository = repository
  }

  public execute ({ provider, date }: Request): Appointment {
    const parsedDate = startOfHour(date)

    if (this.repository.findByDate(parsedDate)) {
      throw Error('This appointment is already booked')
    }

    const appointment = this.repository.create({
      provider,
      date: parsedDate
    })

    return appointment
  }
}

export default CreateAppointmentService
