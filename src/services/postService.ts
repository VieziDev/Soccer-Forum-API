// services/PostService.ts

import { Types } from 'mongoose';
import PostModel, { PostDocument } from '../models/Post';

export default class PostService {
  async createPost(title: string, content: string, author: Types.ObjectId): Promise<PostDocument> {
    const newPost = new PostModel({ title, content, author });
    return await newPost.save();
  }

  async listPosts(): Promise<PostDocument[]> {
    return await PostModel.find();
  }

  async findPostById(id: string): Promise<PostDocument | null> {
    return await PostModel.findById(id);
  }

  async updatePost(id: string, updatedContent: Partial<PostDocument>): Promise<PostDocument | null> {
    return await PostModel.findByIdAndUpdate(id, updatedContent, { new: true });
  }

  async deletePost(id: string): Promise<PostDocument | null> {
    return await PostModel.findByIdAndDelete(id, {});
  }
}
