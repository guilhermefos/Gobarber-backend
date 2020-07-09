import { Router } from 'express'

import AuthenticateUserService from '@services/auth/AuthenticateUserService'

const router = Router()

router.post('/', async (request, response) => {
  const service = new AuthenticateUserService()

  const { user, token } = await service.execute({ ...request.body })

  delete user.password

  return response.json({ user, token })
})

export default router
