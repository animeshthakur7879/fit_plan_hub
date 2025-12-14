const express = require('express');
const { getAllPlans, createPlan, deletePlan, updatePlan, getTrainerPlans } = require('../../controllers/trainer/trainerController');
const trainer = require('../../Middlewares/trainerMiddleware');

const router = express.Router();

router.get("/"  , getAllPlans)
router.get("/:tid"  , getTrainerPlans)
router.post("/" , trainer , createPlan)
router.delete("/:pid" , trainer , deletePlan)
router.put("/:pid" , trainer , updatePlan)



module.exports = router;