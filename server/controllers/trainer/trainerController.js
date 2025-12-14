const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Plan = require('../../Models/planModel');

const getAllPlans = expressAsyncHandler(async (req, res) => {
    // Logic to get all plans for trainers
    const plans = await Plan.find();
    if(plans.length === 0){
        res.status(404);
        throw new Error("No plans found");
    }
    res.status(200).json(plans);
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

    res.status(201).json(plan);

}); 

const deletePlan = expressAsyncHandler(async (req, res) => {
    // Logic to delete a plan
    const planId = req.params.pid;
    const plan = await Plan.findByIdAndDelete(planId);
    if(!plan){
        res.status(404);
        throw new Error("Plan not found");
    }

    res.status(200).json({
        message: "Plan deleted successfully" , 
        id : planId
    })

    // res.status(200).json({ message: "Delete a plan" });
});

const updatePlan = expressAsyncHandler(async (req, res) => {
    // Logic to update a plan
    const planId = req.params.pid;
    // Update logic here    
    const updatedPlan = await Plan.findByIdAndUpdate(planId, req.body, { new: true });
    if(!updatedPlan){
        res.status(404);
        throw new Error("Plan not found");
    }   

    res.status(200).json({ message: "Update a plan" , plan : updatedPlan});
});

const getTrainerPlans = expressAsyncHandler(async (req, res) => {
    const trainerId = req.params.tid;
    // console.log(trainerId);
    const plans = await Plan.find({ trainer: trainerId });  

    if(!plans){
        res.status(404);
        throw new Error("No plans found for this trainer");
    }   

    res.status(200).json(plans);
})

module.exports = {
    getAllPlans,
    createPlan ,
    deletePlan ,
    updatePlan , 
    getTrainerPlans
};