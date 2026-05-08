const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { Pool } = require('pg')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

app.get('/', (req, res) => {
  res.json({
    message: 'Backend funcionando com Docker 🚀'
  })
})

app.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
