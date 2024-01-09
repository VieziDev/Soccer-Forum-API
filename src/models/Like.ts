
import mongoose, { Document, Schema } from 'mongoose';

export interface LikeDocument extends Document {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
}

const LikeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});

export default mongoose.model<LikeDocument>('Like', LikeSchema);