const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Plan = require('../../Models/planModel');
const User = require('../../Models/userModel');

const buyPlan = expressAsyncHandler(async(req , res) => {
    const pid = req.params.pid;
    const userId = req.user._id;
    // console.log(userId , pid )  

    const plan = await Plan.findById(pid);
    if(!plan){
        res.status(404);
        throw new Error("Plan not found");
    }

    const user = await User.findById(userId);
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    const alreadySubscribed = user.subscribedPlans.includes(pid);
    if (alreadySubscribed) {
        return res.status(400).json({ message: "Plan already purchased" });
    }

    // 4️⃣ Subscribe plan (simulate payment)
    user.subscribedPlans.push(pid);
    await user.save();

    // 5️⃣ Success response
    res.status(200).json({
        message: "Plan purchased successfully",
        planId: pid,
    });

    

    // res.status(200).json({ message: "Plan purchased successfully" });  
});

const showSubscribedPlans = expressAsyncHandler(async(req , res) => {
    const userId = req.user._id;   
    const user = await User.findById(userId).populate('subscribedPlans');
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }   
    res.status(200).json(user.subscribedPlans);
    
});

module.exports = { buyPlan , showSubscribedPlans };