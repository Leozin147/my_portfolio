import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'
import { app } from '../app'

beforeAll(() => {
  process.env.API_SECRET = 'test_secret'
  process.env.JWT_SECRET = 'test_jwt_secret'
})

describe('POST /auth/token', () => {
  it('retorna 200 e token com api_secret válido', async () => {
    const res = await request(app)
      .post('/auth/token')
      .send({ api_secret: 'test_secret' })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(typeof res.body.token).toBe('string')
  })

  it('retorna 401 com api_secret inválido', async () => {
    const res = await request(app)
      .post('/auth/token')
      .send({ api_secret: 'wrong_secret' })

    expect(res.status).toBe(401)
    expect(res.body).not.toHaveProperty('token')
  })

  it('retorna 400 sem body', async () => {
    const res = await request(app)
      .post('/auth/token')
      .send({})

    expect(res.status).toBe(400)
    expect(res.body).not.toHaveProperty('token')
  })

  it('não vaza informações sensíveis na resposta de erro', async () => {
    const res = await request(app)
      .post('/auth/token')
      .send({ api_secret: 'wrong_secret' })

    expect(JSON.stringify(res.body)).not.toContain('test_secret')
    expect(JSON.stringify(res.body)).not.toContain('test_jwt_secret')
  })
})
