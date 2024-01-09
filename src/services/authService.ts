// services/UserService.ts

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export default class UserService {
  async registerUser(username: string, email: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
  }

  async loginUser(email: string, password: string): Promise<string | null> {
    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    const accessToken = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY as string, { expiresIn: '1h' });
    return accessToken;
  }
}
