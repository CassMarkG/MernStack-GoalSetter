import dotenv from "dotenv"; // always put this at the start of the file otherwise .env variables will not be accessible
import asyncHandler from "express-async-handler";
import goalModel from '../models/goalModel.js';


dotenv.config();

export const createGoal = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await goalModel.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goal)
})

export const getGoals = asyncHandler(async(req,res) => {
    const goals = await goalModel.find({user: req.user.id})
    // const goals = await goalModel.find({})
    res.status(200).json(goals)
})

export const deleteGoal = asyncHandler(async(req,res) => {
    const goal = await goalModel.findByIdAndDelete(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

    res.status(200).json(goal)
})

export const updateGoal = asyncHandler(async(req,res) => {
    const goal = await goalModel.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })

    res.status(200).json(updatedGoal)
})


export default {createGoal,getGoals,deleteGoal,updateGoal};

