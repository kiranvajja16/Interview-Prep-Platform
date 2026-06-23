const User=require('../models/User')
const bcrypt=require('bcryptjs')

const registerUser=async(req,res)=> {
    try{
    const {name,email,password,role}=req.body
    const existedUser=await User.findOne({email})

    if(existedUser){
        return res.status(400).json({
            message:'User already exists',
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user=await User.create({
        name,email,
        password:hashedPassword,
        role,
    })

    res.status(201).json({
        message:'User registered successfully',
        user,
    })
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }   

}

module.exports={registerUser}