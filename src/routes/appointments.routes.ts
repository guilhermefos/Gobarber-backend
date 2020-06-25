import { Router } from 'express'
import { parseISO } from 'date-fns'
import AppointmentRepository from '@repositories/AppointmentRepository'
import CreateAppointmentService from '@services/appointment/CreateAppointmentService'

const router = Router()
const repository = new AppointmentRepository()

router.get('/', (request, response) => {
  return response.json(repository.all())
})

router.post('/', (request, response) => {
  try {
    const { provider, date } = request.body

    const ISODate = parseISO(date)

    const createAppointmentService = new CreateAppointmentService(repository)

    const appointment = createAppointmentService.execute({ provider, date: ISODate })

    return response.json({ appointment })
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

export default router
