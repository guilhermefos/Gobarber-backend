import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import AppError from '@errors/AppError'
import authConfig from '@config/auth'

interface Token {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction) {
  const authorization = request.headers.authorization

  if (!authorization) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authorization.split(' ')

  try {
    const { secret } = authConfig.jwt

    const decoded = verify(token, secret)

    const { sub } = decoded as Token

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}
