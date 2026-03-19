import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { app } from '../app'

let valid_token: string

beforeAll(() => {
  process.env.API_SECRET = 'test_secret'
  process.env.JWT_SECRET = 'test_jwt_secret'
  process.env.EVOLUTION_API_URL = 'http://evolution-mock'
  process.env.EVOLUTION_API_KEY = 'mock_key'
  process.env.EVOLUTION_INSTANCE = 'mock_instance'
  process.env.WHATSAPP_TARGET_NUMBER = '5513999999999'
  valid_token = jwt.sign({ service: 'frontend' }, 'test_jwt_secret', { expiresIn: '1h' })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('POST /contact', () => {
  it('retorna 200 e chama Evolution API com input válido e JWT', async () => {
    const mock_fetch = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ key: { id: 'abc' } }), { status: 200 })
    )

    const res = await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${valid_token}`)
      .send({ name: 'Leonardo', phone: '5513974057602', message: 'Olá!' })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('ok', true)
    expect(mock_fetch).toHaveBeenCalledOnce()
  })

  it('retorna 400 sem phone', async () => {
    const res = await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${valid_token}`)
      .send({ name: 'Leonardo', message: 'Olá!' })

    expect(res.status).toBe(400)
  })

  it('inclui datas na mensagem quando fornecidas', async () => {
    const mock_fetch = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ key: { id: 'abc' } }), { status: 200 })
    )

    const res = await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${valid_token}`)
      .send({ name: 'Leonardo', phone: '5513974057602', message: 'Olá!', date1: '2026-03-25', date2: '2026-03-26' })

    expect(res.status).toBe(200)
    const call_body = JSON.parse((mock_fetch.mock.calls[0][1] as RequestInit).body as string)
    expect(call_body.text).toContain('2026-03-25')
    expect(call_body.text).toContain('2026-03-26')
  })

  it('retorna 502 quando Evolution API falha', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'fail' }), { status: 500 })
    )

    const res = await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${valid_token}`)
      .send({ name: 'Leonardo', phone: '5513974057602', message: 'Olá!' })

    expect(res.status).toBe(502)
    expect(res.body).not.toHaveProperty('error', 'fail')
  })

  it('retorna 502 quando Evolution API lança exceção', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'))

    const res = await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${valid_token}`)
      .send({ name: 'Leonardo', phone: '5513974057602', message: 'Olá!' })

    expect(res.status).toBe(502)
  })

  it('retorna 400 sem name', async () => {
    const res = await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${valid_token}`)
      .send({ phone: '5513974057602', message: 'Olá!' })

    expect(res.status).toBe(400)
  })

  it('retorna 400 sem message', async () => {
    const res = await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${valid_token}`)
      .send({ name: 'Leonardo', phone: '5513974057602' })

    expect(res.status).toBe(400)
  })

  it('retorna 400 com name vazio', async () => {
    const res = await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${valid_token}`)
      .send({ name: '  ', phone: '5513974057602', message: 'Olá!' })

    expect(res.status).toBe(400)
  })

  it('retorna 400 com message vazia', async () => {
    const res = await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${valid_token}`)
      .send({ name: 'Leonardo', phone: '5513974057602', message: '  ' })

    expect(res.status).toBe(400)
  })

  it('retorna 401 sem token', async () => {
    const res = await request(app)
      .post('/contact')
      .send({ name: 'Leonardo', phone: '5513974057602', message: 'Olá!' })

    expect(res.status).toBe(401)
  })

  it('retorna 401 com token inválido', async () => {
    const res = await request(app)
      .post('/contact')
      .set('Authorization', 'Bearer token_invalido')
      .send({ name: 'Leonardo', phone: '5513974057602', message: 'Olá!' })

    expect(res.status).toBe(401)
  })

  it('não vaza dados sensíveis na resposta de erro da Evolution', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'fail' }), { status: 500 })
    )

    const res = await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${valid_token}`)
      .send({ name: 'Leonardo', phone: '5513974057602', message: 'Olá!' })

    const body = JSON.stringify(res.body)
    expect(body).not.toContain('mock_key')
    expect(body).not.toContain('EVOLUTION')
    expect(body).not.toContain('JWT_SECRET')
    expect(body).not.toContain('API_SECRET')
  })
})
