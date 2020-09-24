import { Router } from 'express'
import { celebrate, Segments, Joi } from "celebrate";
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const router = Router()
const appointmentController = new AppointmentController()
const providerAppointmentsController = new ProviderAppointmentsController()

router.use(ensureAuthenticated)

router.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentController.create
);
router.get('/me', providerAppointmentsController.index);

export default router
