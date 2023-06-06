import express from 'express';
import {protect} from '../middleware/authMiddleware.js'
import {createGoal,getGoals,deleteGoal,updateGoal} from '../controllers/goalController.js';

const router  = express.Router();

router.route('/').get(protect,getGoals).post(protect,createGoal);
router.route('/:id').delete(protect,deleteGoal).put(protect,updateGoal);
// router.get('/', getGoals);
// router.post('/setgoals', createGoal);
// router.delete('/:id', deleteGoal);
// router.put('/update', updateGoal)

export default router;