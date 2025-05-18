import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jobRoutes from './routes/jobRoutes.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/jobs', jobRoutes)

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to GLB.Connect Job Posting API' })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
}) 