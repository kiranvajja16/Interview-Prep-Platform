require('dotenv').config()

const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const adminRoutes=require('./routes/adminRoutes')
const quizRoutes=require('./routes/quizRoutes')
const resultRoutes=require('./routes/resultRoutes')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/quizzes',quizRoutes)
app.use('/api/results',resultRoutes)

app.get('/', (req, res) => {
  res.send('Server Running!!!!!')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})