// controllers/LikeController.ts

import { Request, Response } from 'express';
import LikeService from '../services/likeService';
import LikeModel, { LikeDocument } from '../models/Like';

const likeService = new LikeService();

export default class LikeController {
  async manageLike(req: Request, res: Response): Promise<void> {
    try {
      const { postId } = req.params;
      const { id: userId } = req.user; // Assumindo que o ID do usuário logado está no req.user após a autenticação

      const existingLike = await LikeModel.findOne({ user: userId, post: postId });

      if (existingLike) {
        await likeService.removeLike(userId, postId);
        res.status(200).json({ message: 'Like removido com sucesso' });
      } else {
        await likeService.like(userId, postId);
        res.status(201).json({ message: 'Like adicionado com sucesso' });
      }
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  }

  // Outros métodos do controller
}
