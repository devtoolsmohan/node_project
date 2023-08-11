import express from 'express';
import {getAllposts, getPost, createPost, updatePost, deletePost} from '../controllers/postController';

const router = express.Router();

router.get('/posts', getAllposts);
router.get('/posts/:id', getPost);
router.post('/posts', createPost);
router.put('/posts//:id', updatePost);
router.delete('/posts/:id', deletePost);

export default router;