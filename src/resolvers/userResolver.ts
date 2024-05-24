import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const userResolver = {
    Mutation: {
        register: async (_: any, { username, password }: { username: string; password: string }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, password: hashedPassword });
            const token = jwt.sign({ userId: user.userId, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            return { token, user };
          },
          login: async (_: any, { username, password }: { username: string; password: string }) => {
            const user = await User.findOne({ where: { username } });
            if (!user) {
              throw new Error('User not found');
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
              throw new Error('Invalid password');
            }
            const token = jwt.sign({ userId: user.userId, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            return { token, user };
          },
    },
};

export default userResolver;
