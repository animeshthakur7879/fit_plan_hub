const express = require('express');
const User = require('../../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');

const registerUser = expressAsyncHandler(async (req , res) => {

    const {name , email , password , role } = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    const userExists = await User.find({email});

    if(userExists.length > 0){
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const user = await User.create({
        name,
        email,
        password : hashedPassword,
        role
    });

    if(user){
        res.status(201).json({
            id : user._id,
            name : user.name,
            email : user.email,
            role : user.role,
            token : generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("User not created");
    }
    

})

const loginUser = expressAsyncHandler(async(req , res) => {
    const {email , password} = req.body;
    // console.log(email , password)
    if(!email || !password){
        res.status(400);
        throw new Error("Please fill all the required fields");
    }
    const user = await User.findOne({email});

    if(user.length === 0){
        res.status(400);
        throw new Error("User does not exist");
    }

    // console.log(user.password)
    // console.log(user)

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch)
    //   return res.status(400).json({ message: "Invalid credentials" });

    

    // res.json({name :user.name,
    //     email : user.email,
    //     id: user._id,
    //     token: generateToken(user._id),
    //      role: user.role });

    if(user && await bcrypt.compareSync(password , user.password)){
        res.status(200).json({
            id : user._id,
            name : user.name,
            email : user.email,
            role : user.role,
            token : generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn : '30d'
    })
}
module.exports = {registerUser , loginUser};