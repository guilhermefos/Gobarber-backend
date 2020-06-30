import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

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
    throw new Error('JWT token is missing')
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
    throw new Error('Invalid JWT token')
  }
}
