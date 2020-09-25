import { Router } from 'express'
import multer from 'multer'
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import UserController from '@modules/users/infra/http/controllers/UserController'
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController'

import CreateUserService from '../../../services/CreateUserService'


const router = Router()
const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    },
  }),
  userController.create
);

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update);

export default router
