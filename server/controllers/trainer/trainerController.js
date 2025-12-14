const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Plan = require('../../Models/planModel');

const getAllPlans = expressAsyncHandler(async (req, res) => {
    // Logic to get all plans for trainers
    res.status(200).json({ message: "Get all plans for trainers" });
});

const createPlan = expressAsyncHandler(async (req, res) => {
    
    const { title, description, price , duration } = req.body;

    if(!title || !description || !price || !duration){
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    const plan = await Plan.create({
        title,
        description,
        price,
        duration , 
        trainer : req.user._id
    });

    if(!plan){
        res.status(400);
        throw new Error("Plan not created");
    }



    
}); 

module.exports = {
    getAllPlans,
    createPlan
};