import express from 'express';
import PostController from '../controllers/postController';

const router = express.Router();
const postController = new PostController();

router.get('/', postController.listPost);
router.post('/create', postController.createPost);
router.put('/update/:id', postController.updatePost);
router.delete('/delete/:id', postController.deletePost);

export default router;