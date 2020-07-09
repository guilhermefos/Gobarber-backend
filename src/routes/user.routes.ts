import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import ensureAuthenticated from '@middleware/ensureAuthenticated'

import CreateUserService from '@services/user/CreateUserService'
import UpdateUserAvatarService from '@services/user/UpdateUserAvatarService'

const router = Router()
const upload = multer(uploadConfig)

router.post('/', async (request, response) => {
  const userService = new CreateUserService()

  const user = await userService.execute({ ...request.body })

  delete user.password

  return response.json(user)
})

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const service = new UpdateUserAvatarService()

    const user = await service.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    })

    delete user.password

    return response.json(user)
  })

export default router
