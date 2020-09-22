import { Router } from 'express';

import users from '@modules/users/infra/http/routes/user.routes';
import password from '@modules/users/infra/http/routes/password.routes';
import sessions from '@modules/users/infra/http/routes/sessions.routes';
import profile from '@modules/users/infra/http/routes/profile.routes';
import appointments from '@modules/appointments/infra/http/routes/appointments.routes';

const routes = Router()

routes.use('/users', users);
routes.use('/password', password);
routes.use('/sessions', sessions);
routes.use('/profile', profile);
routes.use('/appointments', appointments);

export default routes;
