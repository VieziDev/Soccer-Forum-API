import mongoose, { Document, Schema } from 'mongoose';

export interface PostDocument extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
}

const postSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const PostModel = mongoose.model<PostDocument>('Post', postSchema);

export default PostModel;