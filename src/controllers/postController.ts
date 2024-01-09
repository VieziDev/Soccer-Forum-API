// controllers/PostController.ts

import { Request, Response } from 'express';
import { Types } from 'mongoose';
import PostService from '../services/postService';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

require('dotenv').config()

const postService = new PostService();

export default class PostController {
  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, content } = req.body;
      const userID = req.user.id;
      const newPost = await postService.createPost(title, content, new Types.ObjectId(userID));
      res.status(201).json(newPost);
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  }

  async listPost(req: Request, res: Response): Promise<void> {
    try {
      const posts = await postService.listPosts();
      res.status(200).json(posts);
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  }

  async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const { title, content } = req.body;
      const newData = { title, content };
      const { id } = req.params;

      const updatedPost = await postService.updatePost(id, newData);

      if (!updatedPost) {
        res.status(404).json({ message: 'Post Not Found' });
        return;
      }

      res.status(200).json(updatedPost);
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedPost = await postService.deletePost(id);
      if (!deletedPost) {
        res.status(404).json({ message: 'Post Not Found' });
        return;
      }
      res.status(204).json({ message: "Post succefully deleted" });
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  }

}
