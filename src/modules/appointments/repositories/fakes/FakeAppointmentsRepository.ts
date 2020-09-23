import { uuid } from "uuidv4";
import { isEqual, getYear, getMonth } from "date-fns";

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppoitmentDTO from '@modules/appointments/dtos/ICreateAppoitmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment =>
            appointment.provider_id === provider_id &&
            getMonth(appointment.date) + 1 === month &&
            getYear(appointment.date) === year
        );

        return appointments;
    };

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findedAppointment = this.appointments.find(
            appointment => isEqual(appointment.date, date),
        );

        return findedAppointment;
    };

    public async create({ provider_id, date }: ICreateAppoitmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointments.push(appointment);

        return appointment;
    };
}

export default AppointmentRepository
