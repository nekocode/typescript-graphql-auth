import { verify, sign as _sign, Secret, SignOptions } from 'jsonwebtoken'
import { Context } from '..'

const APP_SECRET = 'test'

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

export function sign(
  payload: string | Buffer | object,
  secretOrPrivateKey: Secret = APP_SECRET,
  options?: SignOptions
): string {
  return _sign(payload, secretOrPrivateKey, options)
}

export function getLoggedUserId(ctx: Context) {
  const auth = ctx.req.headers.authorization

  if (auth) {
    const token = auth.replace('Bearer ', '')
    const verifiedToken: any = verify(token, APP_SECRET)
    return verifiedToken && verifiedToken.userId
  }

  throw new AuthError()
}
