import express from 'express';
import {getAllposts, getPost, createPost, updatePost, deletePost} from '../controllers/postController';
import { secretKey , authenticateToken} from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, getAllposts);
router.post('/', authenticateToken, createPost);
router.get('/:id', authenticateToken, getPost);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);

export default router;