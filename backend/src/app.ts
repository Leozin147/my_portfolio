import 'dotenv/config'
import express from 'express'
import { cors_options } from './plugins/cors'
import { auth_router } from './routes/auth'
import { contact_router } from './routes/contact'

const app = express()

app.use(cors_options)
app.use(express.json())

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/auth', auth_router)
app.use('/contact', contact_router)

export { app }
