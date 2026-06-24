const mongoose=require('mongoose')

const questionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    options:[
        {
            type:String,
            required:true,
        }
    ],
    correctAnswer:{
        type:String,
        required:true,
    }
})

const quizSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    question:[questionSchema],
},{timestamps:true,})

module.exports=mongoose.model('Quiz',quizSchema)