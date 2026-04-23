// @vitest-environment node
import { describe, it, expect } from 'vitest'
import express from 'express'
import supertest from 'supertest'
import { createDb } from '../db'
import { createAuthRouter } from '../routes/auth'

function buildApp() {
  const db = createDb()
  const app = express()
  app.use(express.json())
  app.use('/api/auth', createAuthRouter(db))
  return supertest(app)
}

describe('POST /api/auth/register', () => {
  it('registers a new user and returns 201 with token', async () => {
    const req = buildApp()
    const res = await req
      .post('/api/auth/register')
      .send({ email: 'new@example.com', password: 'password123' })

    expect(res.status).toBe(201)
    expect(res.body.token).toBeTypeOf('string')
    expect(res.body.user).toMatchObject({ email: 'new@example.com' })
    expect(res.body.user.id).toBeTypeOf('number')
  })

  it('normalises email to lowercase', async () => {
    const req = buildApp()
    const res = await req
      .post('/api/auth/register')
      .send({ email: 'Upper@Example.COM', password: 'password123' })

    expect(res.status).toBe(201)
    expect(res.body.user.email).toBe('upper@example.com')
  })

  it('returns 409 for duplicate email', async () => {
    const req = buildApp()
    await req.post('/api/auth/register').send({ email: 'dup@example.com', password: 'password123' })
    const res = await req.post('/api/auth/register').send({ email: 'dup@example.com', password: 'password123' })

    expect(res.status).toBe(409)
    expect(res.body.error).toMatch(/already registered/i)
  })

  it('returns 400 when fields are missing', async () => {
    const req = buildApp()
    const res = await req.post('/api/auth/register').send({ email: 'x@y.com' })
    expect(res.status).toBe(400)
  })

  it('returns 400 when password is too short', async () => {
    const req = buildApp()
    const res = await req.post('/api/auth/register').send({ email: 'x@y.com', password: 'short' })
    expect(res.status).toBe(400)
  })
})

describe('POST /api/auth/login', () => {
  it('returns token on valid credentials', async () => {
    const req = buildApp()
    await req.post('/api/auth/register').send({ email: 'login@example.com', password: 'password123' })
    const res = await req.post('/api/auth/login').send({ email: 'login@example.com', password: 'password123' })

    expect(res.status).toBe(200)
    expect(res.body.token).toBeTypeOf('string')
    expect(res.body.user.email).toBe('login@example.com')
  })

  it('returns 401 for wrong password', async () => {
    const req = buildApp()
    await req.post('/api/auth/register').send({ email: 'bad@example.com', password: 'password123' })
    const res = await req.post('/api/auth/login').send({ email: 'bad@example.com', password: 'wrongpassword' })

    expect(res.status).toBe(401)
    expect(res.body.error).toMatch(/invalid credentials/i)
  })

  it('returns 401 for unknown email', async () => {
    const req = buildApp()
    const res = await req.post('/api/auth/login').send({ email: 'nobody@example.com', password: 'password123' })
    expect(res.status).toBe(401)
  })

  it('returns 400 when fields are missing', async () => {
    const req = buildApp()
    const res = await req.post('/api/auth/login').send({ password: 'password123' })
    expect(res.status).toBe(400)
  })
})

describe('GET /api/auth/me', () => {
  it('returns user data for a valid token', async () => {
    const req = buildApp()
    const reg = await req.post('/api/auth/register').send({ email: 'me@example.com', password: 'password123' })
    const res = await req.get('/api/auth/me').set('Authorization', `Bearer ${reg.body.token}`)

    expect(res.status).toBe(200)
    expect(res.body.email).toBe('me@example.com')
    expect(res.body.created_at).toBeTruthy()
  })

  it('returns 401 with no Authorization header', async () => {
    const req = buildApp()
    const res = await req.get('/api/auth/me')
    expect(res.status).toBe(401)
  })

  it('returns 401 for an invalid token', async () => {
    const req = buildApp()
    const res = await req.get('/api/auth/me').set('Authorization', 'Bearer not-a-valid-jwt')
    expect(res.status).toBe(401)
  })
})
