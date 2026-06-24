
const express=require('express')

const {submitQuiz,getMyResults,getResultById}=require('../controllers/resultController')
const {protect}=require('../middleware/authMiddleware')
const {authorizeRoles}=require('../middleware/roleMiddleware')

const router=express.Router()

router.post('/submit',protect,authorizeRoles('candidate'),submitQuiz)
router.get('/my-results',protect,authorizeRoles('candidate'),getMyResults)
router.get('/:id',protect,getResultById)

module.exports=router

