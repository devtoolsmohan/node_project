import express from 'express';
import { secretKey , authenticateToken} from '../middleware/authMiddleware';

import { registerUser, loginUser, getAllUsers, currentUser } from '../controllers/userController';

const router = express.Router();

router.get('/', authenticateToken, getAllUsers);
router.post('/profile', authenticateToken, currentUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
export default router;