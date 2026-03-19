import { Router, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import { auth_middleware } from '../middleware/auth'

const contact_limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  message: { error: 'Too many requests, please try again later.' },
})

export const contact_router = Router()

contact_router.post('/', contact_limiter, auth_middleware, async (req: Request, res: Response): Promise<void> => {
  const { name, phone, message, date1, date2 } = req.body

  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ error: 'name is required' })
    return
  }

  if (!phone || typeof phone !== 'string' || phone.trim() === '') {
    res.status(400).json({ error: 'phone is required' })
    return
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    res.status(400).json({ error: 'message is required' })
    return
  }

  const { EVOLUTION_API_URL, EVOLUTION_API_KEY, EVOLUTION_INSTANCE, WHATSAPP_TARGET_NUMBER } = process.env

  const dates_section = (date1 || date2)
    ? `\n\nDisponibilidade para reunião:${date1 ? `\n📅 Data 1: ${date1}` : ''}${date2 ? `\n📅 Data 2: ${date2}` : ''}`
    : ''

  const text = `Nova mensagem do portfolio!\n\nNome: ${name.trim()}\nTelefone: ${phone.trim()}\nMensagem: ${message.trim()}${dates_section}`

  try {
    const evolution_res = await fetch(
      `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': EVOLUTION_API_KEY!,
        },
        body: JSON.stringify({
          number: WHATSAPP_TARGET_NUMBER,
          text,
        }),
      }
    )

    if (!evolution_res.ok) {
      console.error('[contact] Evolution API error:', evolution_res.status)
      res.status(502).json({ error: 'Failed to send message' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[contact] Evolution API exception:', err)
    res.status(502).json({ error: 'Failed to send message' })
  }
})
