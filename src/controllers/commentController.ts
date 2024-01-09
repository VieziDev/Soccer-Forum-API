// controllers/CommentController.ts

import { Request, Response } from 'express';
import CommentService from '../services/commentService';

const commentService = new CommentService();

export default class CommentController {
  async createComment(req: Request, res: Response): Promise<void> {
    try {
      const { content } = req.body;
      const { id: author } = req.user; // Assumindo que o ID do usuário logado está no req.user após a autenticação
      const { postId } = req.params;

      const newComment = await commentService.createComment(content, author, postId);

      res.status(201).json(newComment);
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  }

  async getComments(req: Request, res: Response): Promise<void> {
    try {
      const { postId } = req.params;

      const comments = await commentService.getComments(postId);

      res.status(200).json(comments);
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  }

  async editComment(req: Request, res: Response): Promise<void> {
    try {
      const { id: commentId } = req.params;
      const { newContent } = req.body;

      const updatedComment = await commentService.editComment(commentId, newContent);

      if (!updatedComment) {
        res.status(404).json({ message: 'Comentário não encontrado' });
        return;
      }

      res.status(200).json(updatedComment);
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  }

  async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const { id: commentId } = req.params;

      const deletedComment = await commentService.deleteComment(commentId);

      if (!deletedComment) {
        res.status(404).json({ message: 'Comentário não encontrado' });
        return;
      }

      res.status(200).json({ message: 'Comentário deletado com sucesso' });
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  }

  // Outros métodos do controller
}

