import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const auth_router = Router()

auth_router.post('/token', (req: Request, res: Response): void => {
  const { api_secret } = req.body

  if (!api_secret) {
    res.status(400).json({ error: 'api_secret is required' })
    return
  }

  if (api_secret !== process.env.API_SECRET) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const jwt_secret = process.env.JWT_SECRET
  if (!jwt_secret) {
    res.status(500).json({ error: 'Server misconfigured' })
    return
  }

  const token = jwt.sign({ service: 'frontend' }, jwt_secret, { expiresIn: '1h' })
  res.status(200).json({ token })
})
