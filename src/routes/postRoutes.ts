import express from 'express';
import PostController from '../controllers/postController';
import { authenticateToken } from 'middlewares/authMiddleware';
import CommentController from 'controllers/commentController';
import LikeController from 'controllers/likeController';

const router = express.Router();
const postController = new PostController();
const commentController = new CommentController();
const likeController = new LikeController();

// CRUD Posts   
router.get('/', authenticateToken, postController.listPost);
router.post('/create', authenticateToken, postController.createPost);
router.put('/update/:id', authenticateToken, postController.updatePost);
router.delete('/delete/:id', authenticateToken, postController.deletePost);

// Comment Routes
router.post('/:postId/comment', authenticateToken, commentController.createComment);
router.get('/:postId/comments', commentController.getComments);
router.put('/comments/:id', authenticateToken, commentController.editComment);
router.delete('/comments/:id', authenticateToken, commentController.deleteComment);


// Like Routes
router.post('/:postId/like', authenticateToken, likeController.manageLike);

export default router;