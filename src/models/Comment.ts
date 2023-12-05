import mongoose, { Schema, Document } from 'mongoose';

interface CommentDocument extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  // outros atributos, se necessário
}

const commentSchema: Schema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  // defina outros atributos conforme necessário
});

const Comment = mongoose.model<CommentDocument>('Comment', commentSchema);

export default Comment;
