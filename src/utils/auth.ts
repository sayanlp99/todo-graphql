import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


export const generateToken = (user: User) => {
    return jwt.sign({ userId: user.userId, scope: 'user' }, JWT_SECRET, { expiresIn: '1h' });
};

export const getUserFromToken = async (token: string) => {
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return await User.findByPk(decoded.userId);
  } catch (error) {
    return null;
  }
};

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export const getScope = (authorizationHeader: string | undefined): string | null => {
  if (!authorizationHeader) {
    return null;
  }

  const [, token] = authorizationHeader.split(' ');

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.scope;
  } catch (error) {
    return null;
  }
};
