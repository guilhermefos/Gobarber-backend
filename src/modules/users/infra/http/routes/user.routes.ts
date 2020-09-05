import { Router } from 'express'
import multer from 'multer'
import { container } from "tsyringe";

import uploadConfig from '@config/upload'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import UserController from '@modules/users/infra/http/controllers/UserController'
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController'

import CreateUserService from '../../../services/CreateUserService'


const router = Router()
const upload = multer(uploadConfig)
const userController = new UserController();
const userAvatarController = new UserAvatarController();

router.post('/', userController.create);

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update);

export default router
