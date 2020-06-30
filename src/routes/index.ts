import { Router } from 'express'

import users from './user.routes'
import sessions from './sessions.routes'
import appointments from './appointments.routes'

const routes = Router()

routes.use('/users', users)
routes.use('/sessions', sessions)
routes.use('/appointments', appointments)

export default routes
