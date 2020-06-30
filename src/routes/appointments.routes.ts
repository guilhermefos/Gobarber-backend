import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentRepository from '@repositories/AppointmentRepository'
import CreateAppointmentService from '@services/appointment/CreateAppointmentService'

const router = Router()

router.get('/', async (request, response) => {
  const repository = getCustomRepository(AppointmentRepository)
  const appointments = await repository.find()

  return response.json(appointments)
})

router.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body

    const ISODate = parseISO(date)

    const createAppointmentService = new CreateAppointmentService()

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: ISODate
    })

    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

export default router
