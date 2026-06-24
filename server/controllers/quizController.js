const Quiz=require('../models/Quiz')

const createQuiz= async (req,res)=>{
    try{
        const {title,description,questions}=req.body
        const quiz= await Quiz.create({
            title,description,questions,
            createdBy:req.user._id,
        })
        res.status(201).json(quiz)
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}

const getAllQuizzes=async(req,res)=>{
    try{
        const quizzes=await Quiz.find()
        res.status(200).json(quizzes)
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}

const getQuizById = async(req,res)=>{
    try{
        const quiz=await Quiz.findById(
            req.params.id
        )
        if(!quiz){
            return res.status(404).json({
                message:'Quiz not found',
            })
        }
        res.json(quiz)
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}

const updateQuiz=async(req,res)=>{
    try{
        const quiz=await Quiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
            }
        )
        res.json(quiz)
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}

const deleteQuiz=async(req,res)=>{
    try{
        await Quiz.findByIdAndDelete(req.params.id)
        res.json({
            message:'Quiz deleted',
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}

module.exports={
    createQuiz,
    getAllQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz,
}