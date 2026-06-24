const express=require('express')

const {submitQuiz}=require('../controllers/resultController')
const {protect}=require('../middleware/authMiddleware')
const {authorizeRoles}=require('../middleware/roleMiddleware')

const router=express.Router()

router.post('/submit',protect,authorizeRoles('candidate'),submitQuiz)

module.exports=router

