require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const adminRoutes=require('./routes/adminRoutes')
const quizRoutes=require('./routes/quizRoutes')
const app = express()

connectDB()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/quizzes',quizRoutes)

app.get('/', (req, res) => {
  res.send('Server Running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})