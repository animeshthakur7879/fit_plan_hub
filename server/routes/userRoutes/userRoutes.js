const express = require('express');
const { getAllPlans } = require('../../controllers/trainer/trainerController');
const protect = require('../../Middlewares/authMiddleware');
const { buyPlan, showSubscribedPlans } = require('../../controllers/user/userController');
const router = express.Router();

router.get('/' , getAllPlans)
router.post('/buyPlan/:pid'  , protect , buyPlan)
router.get('/myPlans' , protect , showSubscribedPlans)

module.exports = router;