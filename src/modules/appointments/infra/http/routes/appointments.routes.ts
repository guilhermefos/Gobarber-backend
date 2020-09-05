import { Router } from 'express'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';

const router = Router()
const appointmentController = new AppointmentController()

router.use(ensureAuthenticated)

// router.get('/', async (request, response) => {
//   const appointments = await repository.find()

//   return response.json(appointments)
// })

router.post('/', appointmentController.create);

export default router
