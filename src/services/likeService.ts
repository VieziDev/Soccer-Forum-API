// services/LikeService.ts

import LikeModel, { LikeDocument } from '../models/Like';

export default class LikeService {
  async like(userId: string, postId: string): Promise<LikeDocument> {
    const newLike = new LikeModel({ user: userId, post: postId });
    await newLike.save();
    return newLike;
  }

  async removeLike(userId: string, postId: string): Promise<LikeDocument | null> {
    const removedLike = await LikeModel.findOneAndDelete({ user: userId, post: postId }) as unknown as LikeDocument | null;
    return removedLike;
  }

}
