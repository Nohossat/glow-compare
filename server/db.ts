import Database from 'better-sqlite3'
import path from 'path'

export type User = {
  id: number
  email: string
  password_hash: string
  created_at: string
}

export type PublicUser = {
  id: number
  email: string
  created_at: string
}

let singleton: Database.Database | undefined

export function getDb(): Database.Database {
  if (!singleton) {
    const dbPath = process.env.DB_PATH ?? path.join(process.cwd(), 'data.db')
    singleton = new Database(dbPath)
    singleton.pragma('journal_mode = WAL')
    migrate(singleton)
  }
  return singleton
}

export function createDb(dbPath = ':memory:'): Database.Database {
  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  migrate(db)
  return db
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      email         TEXT    UNIQUE NOT NULL,
      password_hash TEXT    NOT NULL,
      created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `)
}
