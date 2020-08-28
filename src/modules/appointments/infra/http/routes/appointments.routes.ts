import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

const router = Router()

router.use(ensureAuthenticated)

router.get('/', async (request, response) => {
  const repository = getCustomRepository(AppointmentRepository)
  const appointments = await repository.find()

  return response.json(appointments)
})

router.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const ISODate = parseISO(date)

  const createAppointmentService = new CreateAppointmentService()

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: ISODate
  })

  return response.json(appointment)
})

export default router
