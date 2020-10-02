import 'reflect-metadata'

import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express'
import { errors } from "celebrate";
import cors from 'cors'
import 'express-async-errors'

import routes from './routes'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

import rateLimiter from './middleware/rateLimiter';

import '@shared/infra/typeorm'
import '@shared/container'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(rateLimiter);
app.use(routes)
app.use(errors);

app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: error.message
  })
})

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333')
})
