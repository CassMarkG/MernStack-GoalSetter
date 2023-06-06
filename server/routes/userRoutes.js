import express from 'express';
import {createUser,loginUser,getUser} from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/getuser', getUser);
router.post('/', createUser);
router.post('/login', loginUser);

export default router;