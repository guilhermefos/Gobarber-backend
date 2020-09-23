import { Router } from 'express'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const router = Router()
const appointmentController = new AppointmentController()
const providerAppointmentsController = new ProviderAppointmentsController()

router.use(ensureAuthenticated)

router.post('/', appointmentController.create);
router.get('/me', providerAppointmentsController.index);

export default router
