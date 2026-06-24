const Quiz=require('../models/Quiz')

const createQuiz= async (req,res)=>{
    try{
        const {title,description,questions,}=req.body
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

module.exports={
    createQuiz,
}