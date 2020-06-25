import Appointment from '@models/Appointment'
import { isEqual } from 'date-fns'

interface AppointmentInterface {
  provider: string,
  date: Date
}

class AppointmentRepository {
  private appointments: Appointment[]

  constructor () {
    this.appointments = []
  }

  public all (): Appointment[] {
    return this.appointments
  }

  public findByDate (date: Date): Appointment | null {
    const appointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    )
    return appointment || null
  }

  public create ({ provider, date }: AppointmentInterface): Appointment {
    const appointment = new Appointment({ provider, date })
    this.appointments.push(appointment)
    return appointment
  }
}

export default AppointmentRepository
