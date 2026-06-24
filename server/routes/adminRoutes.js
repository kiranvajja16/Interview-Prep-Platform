const express=require('express')
const {protect}=require('../middleware/authMiddleware')
const {authorizeRoles}=require('../middleware/roleMiddleware')
const {getAllUsers,deleteUser,promoteUser,getAnalytics} = require('../controllers/adminController')

const router=express.Router()
router.get('/dashboard',protect,authorizeRoles('admin'),(req,res)=>{
    res.json({
        message:'Welcome Admin',
    })
})

router.get('/users',protect,authorizeRoles('admin'),getAllUsers)
router.delete('/users/:id',protect,authorizeRoles('admin'),deleteUser)
router.put('/promote/:id',protect,authorizeRoles('admin'),promoteUser)
router.get('/analytics',protect,authorizeRoles('admin'),getAnalytics)


module.exports=router
