import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { Database } from 'better-sqlite3'
import { getDb } from '../db'
import { requireAuth, type AuthRequest } from '../middleware/requireAuth'

function jwtSecret() {
  return process.env.JWT_SECRET ?? 'dev-secret'
}

export function createAuthRouter(db?: Database) {
  const router = Router()
  const resolve = () => db ?? getDb()

  router.post('/register', async (req, res) => {
    const { email, password } = req.body as { email?: string; password?: string }
    if (!email || !password) {
      res.status(400).json({ error: 'email and password are required' })
      return
    }
    if (password.length < 8) {
      res.status(400).json({ error: 'password must be at least 8 characters' })
      return
    }

    const hash = await bcrypt.hash(password, 10)
    try {
      const user = resolve()
        .prepare('INSERT INTO users (email, password_hash) VALUES (?, ?) RETURNING id, email, created_at')
        .get(email.toLowerCase(), hash) as { id: number; email: string; created_at: string }

      const token = jwt.sign({ sub: user.id }, jwtSecret(), { expiresIn: '7d' })
      res.status(201).json({ token, user: { id: user.id, email: user.email } })
    } catch (err) {
      if (err instanceof Error && err.message.includes('UNIQUE')) {
        res.status(409).json({ error: 'Email already registered' })
        return
      }
      res.status(500).json({ error: 'Registration failed' })
    }
  })

  router.post('/login', async (req, res) => {
    const { email, password } = req.body as { email?: string; password?: string }
    if (!email || !password) {
      res.status(400).json({ error: 'email and password are required' })
      return
    }

    const user = resolve()
      .prepare('SELECT * FROM users WHERE email = ?')
      .get(email.toLowerCase()) as { id: number; email: string; password_hash: string; created_at: string } | undefined

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = jwt.sign({ sub: user.id }, jwtSecret(), { expiresIn: '7d' })
    res.json({ token, user: { id: user.id, email: user.email } })
  })

  router.get('/me', requireAuth, (req: AuthRequest, res) => {
    const user = resolve()
      .prepare('SELECT id, email, created_at FROM users WHERE id = ?')
      .get(req.userId!) as { id: number; email: string; created_at: string } | undefined

    if (!user) {
      res.status(401).json({ error: 'User not found' })
      return
    }
    res.json(user)
  })

  return router
}
