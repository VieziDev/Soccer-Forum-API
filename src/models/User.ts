import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  // outros campos, se necessário
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // defina outros campos conforme necessário
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
