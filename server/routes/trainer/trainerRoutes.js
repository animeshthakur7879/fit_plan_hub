const express = require('express');
const { getAllPlans, createPlan } = require('../../controllers/trainer/trainerController');
const trainer = require('../../Middlewares/trainerMiddleware');

const router = express.Router();

router.get("/"  , getAllPlans)
router.post("/" , trainer , createPlan)



module.exports = router;