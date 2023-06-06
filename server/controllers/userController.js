import dotenv from "dotenv"; // always put this at the start of the file otherwise .env variables will not be accessible
import userModel from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

export const createUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields');
    }

    //check if user exists
    const userExists = await userModel.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //create user
    const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
        console.log('User Registration Successful');
    }else{
        res.status(400)
        throw new Error('Invalid user data');
    }
})

export const loginUser = asyncHandler( async(req,res) => {
    const {email,password} = req.body;

    //check user email and compare password 
    const user = await userModel.findOne({email});
    const match = await bcrypt.compare(password,user.password);

    if(user && match){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
        console.log('User Login Successful');
    }else{
        res.status(400)
        throw new Error('Invalid Credientials')
    }
})

export const getUser = asyncHandler( async(req,res) => {
    const getAll = await userModel.find({});
    res.status(200).json(getAll)

})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}

export default {createUser,loginUser,getUser};