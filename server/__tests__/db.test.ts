// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest'
import { createDb } from '../db'
import type Database from 'better-sqlite3'

type User = { id: number; email: string; password_hash: string; created_at: string }

describe('db schema', () => {
  let db: ReturnType<typeof createDb>

  beforeEach(() => {
    db = createDb()
  })

  it('creates the users table', () => {
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
    expect(tables).toContainEqual({ name: 'users' })
  })

  it('inserts a user and retrieves it', () => {
    db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run('a@b.com', 'hash')
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get('a@b.com') as User
    expect(user).toMatchObject({ email: 'a@b.com', password_hash: 'hash' })
    expect(user.id).toBeTypeOf('number')
  })

  it('enforces unique email constraint', () => {
    db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run('dup@b.com', 'hash')
    expect(() => {
      db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run('dup@b.com', 'hash2')
    }).toThrow()
  })

  it('auto-sets created_at', () => {
    db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run('ts@b.com', 'hash')
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get('ts@b.com') as User
    expect(user.created_at).toBeTruthy()
  })

  it('rejects null email', () => {
    expect(() => {
      db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(null, 'hash')
    }).toThrow()
  })

  it('rejects null password_hash', () => {
    expect(() => {
      db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run('x@b.com', null)
    }).toThrow()
  })
})
