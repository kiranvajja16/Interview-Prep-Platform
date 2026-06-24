const express=require('express')
const {protect}=require('../middle/authMiddleware')
const {authorizeRoles}=require('../middleware/roleMiddleware')


const router=express.Router()
router.get('/dashboard',protect,authorizRoles('admin'),(req,res)=>{
    res.json({
        message:'Welcome Admin',
    })
})


module.exports=router
