const User= require('../models/User')
const Quiz=require('../models/quiz')
const Result=require('../models/Result')

const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find().select('-password')
        res.json(users)
    }
    catch(err){
        res.status(500).json({
            message:err.message,
    })
    }
}
const deleteUser=async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.json({
            message:'User deleted successfully',
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}
const promoteUser=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        user.role='instructor'
        await user.save();
        res.json({
            message:'User promoted',
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}
const getAnalytics=async(req,res)=>{
    try{
        const totalUsers=await User.countDocuments()
        const totalCandidates=await User.countDocuments({
            role:'candidate',
        })
        const totalInstructors=await User.countDocuments({
            role:'instructor',
        })
        const totalQuizzes=await Quiz.countDocuments()
        const totalAttempts=await Result.countDocuments()

        res.json({
            totalUsers,
            totalCandidates,
            totalInstructors,
            totalQuizzes,
            totalAttempts,
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}



module.exports={getAllUsers,deleteUser,promoteUser,getAnalytics}