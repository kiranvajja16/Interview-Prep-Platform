const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type : String,
        required: true,
    },
    email:{
        type: String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:['candidate','instructor','admin'],
        default:'candidate',
    },  
},{timestamps:true})

module.exports=mongoose.model('User',userSchema)