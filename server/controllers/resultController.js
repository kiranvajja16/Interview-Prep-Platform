const Result=require('../models/Result')
const Quiz=require('../models/Quiz')

const submitQuiz=async(req,res)=>{
    try{
        const {quizId,answers}=req.body
        const quiz = await Quiz.findById(quizId)
        
        if(!quiz){
            return res.status(404).json({
                message:'Quiz not found',
        })
        }

        let score=0;
        quiz.questions.forEach((question,index)=>{
            if(answers[index]===question.correctAnswer){
                score++
            }
        })

        const result=await Result.create({
            candidate:req.user._id,
            quiz:quizId,
            score,
            totalQuestions:quiz.questions.length,
            percentage:(score/quiz.questions.length)*100,
        })
        res.status(201).json(result)

    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}

const getMyResults=async(req,res)=>{
    try{
        const results=await Result.find({
            candidate:req.user._id,  
        }).populate('quiz','title')
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}

const getResultById=async(req,res)=>{
    try{
        const result=await Result.findById(req.params.id)
        .populate('candidate','name email').populate('quiz','title')

        if(!result){
            return res.status(400).json({
                message:'Result not found',
            })
        }
        res.json(result)
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}

module.exports={
    submitQuiz,
    getMyResults,
    getResultById,
}