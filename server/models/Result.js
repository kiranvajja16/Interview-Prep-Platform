const mongoose =require('mongoose')

const resultSchema=new mongoose.Schema({
    candidate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Quiz',
        required:true,
    },
    score:{
        type:Number,
        default:0,
    },
    totalQuestions:{
        type:Number,
    },
    percentage:{
        type:Number,
    },
},{timestamps:true,})

module.exports=mongoose.model('Result',resultSchema)