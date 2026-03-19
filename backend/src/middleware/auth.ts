import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function auth_middleware(req: Request, res: Response, next: NextFunction): void {
  const auth_header = req.headers['authorization']

  if (!auth_header || !auth_header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = auth_header.split(' ')[1]
  const jwt_secret = process.env.JWT_SECRET

  if (!jwt_secret) {
    res.status(500).json({ error: 'Server misconfigured' })
    return
  }

  try {
    jwt.verify(token, jwt_secret)
    next()
  } catch {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
