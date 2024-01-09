// models/Comment.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface CommentDocument extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
}

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});

export default mongoose.model<CommentDocument>('Comment', CommentSchema);
