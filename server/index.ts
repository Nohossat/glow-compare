import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createAuthRouter } from './routes/auth'

const app = express()
const PORT = Number(process.env.PORT ?? 3001)

app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth', createAuthRouter())

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
