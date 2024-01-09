// services/LikeService.ts

import LikeModel, { LikeDocument } from '../models/Like';

export default class LikeService {
  async like(userId: string, postId: string): Promise<LikeDocument> {
    const newLikes = new LikeModel({ user: userId, post: postId });
    await newLikes.save();
    return newLikes;
  }

  async removeLike(userId: string, postId: string): Promise<LikeDocument | null> {
    const removedLike = await LikeModel.findOneAndDelete({ user: userId, post: postId }, () => { });
    return removedLike;
  }


}
