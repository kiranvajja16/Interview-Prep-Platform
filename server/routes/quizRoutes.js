const express = require('express')

const {
  createQuiz,
} = require('../controllers/quizController')

const {
  protect,
} = require('../middleware/authMiddleware')

const {
  authorizeRoles,
} = require('../middleware/roleMiddleware')

const router = express.Router()

router.post(
  '/',
  protect,
  authorizeRoles('instructor'),
  createQuiz
)

module.exports = router