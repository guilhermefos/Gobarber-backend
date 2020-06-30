import { Router } from 'express'
import CreateUserService from '@services/user/CreateUserService'

const router = Router()

router.post('/', async (request, response) => {
  try {
    const userService = new CreateUserService()

    const user = await userService.execute({ ...request.body })

    delete user.password

    return response.json(user)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

export default router
