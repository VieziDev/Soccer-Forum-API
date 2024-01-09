import CommentModel, { CommentDocument } from '../models/Comment';

export default class CommentService {
  async createComment(content: string, author: string, postId: string): Promise<CommentDocument> {
    const newComment = new CommentModel({ content, author, post: postId });
    await newComment.save();
    return newComment;
  }

  async getComments(postId: string): Promise<CommentDocument[]> {
    return CommentModel.find({ post: postId }).exec();
  }

  async editComment(commentId: string, novoConteudo: string): Promise<CommentDocument | null> {
    return CommentModel.findByIdAndUpdate(commentId, { content: novoConteudo }, { new: true }).exec();
  }

  async deleteComment(commentId: string): Promise<CommentDocument | null> {
    return CommentModel.findByIdAndDelete(commentId, () => { }).exec();
  }

}