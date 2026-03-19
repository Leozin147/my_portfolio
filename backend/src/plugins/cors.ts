import cors from 'cors'

const allowed_origins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000']

export const cors_options = cors({
  origin: allowed_origins,
  methods: ['GET', 'POST'],
  credentials: true,
})
