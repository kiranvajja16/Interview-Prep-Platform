const express = require('express')

const {
  createQuiz,getAllQuizzes,getQuizById,updateQuiz,deleteQuiz
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
router.get('/',protect,getAllQuizzes)
router.get('/:id',protect,getQuizById)
router.put('/:id',protect,authorizeRoles('instructor'),updateQuiz)
router.delete('/:id',protect,authorizeRoles('instructor'),deleteQuiz)

module.exports = router