import { ApolloServer } from 'apollo-server-express';
import { sequelize } from './database';
import { readFileSync } from 'fs';
import resolvers from './resolvers';
import { getUserFromToken } from './utils/auth';
import express from 'express';
import { User } from './models/User';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

export async function startServer(){

    const typeDefs = readFileSync('./src/schemas/schema.graphql', 'utf8');

    const app = express();    

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            const authHeader = req.headers.authorization || '';
            const parts = authHeader.split(' ');
            const token = parts[1] || '';
            const user = await getUserFromToken(token);
            return { user, models: { User } };
        },
        formatError: (error) => {
            console.error(JSON.stringify(error));
            throw {
                message: error.message,
            };
        },
    });

    await server.start();

    server.applyMiddleware({ app });

    try {
        await sequelize.authenticate();
        console.log('Connection to database successful!');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }

    sequelize.sync().then(() => {
        app.listen(PORT, async () => {
            console.log(`Server is running on http://localhost:${PORT}/graphql`);
            console.log(`GraphQL Playground is available at http://localhost:${PORT}/graphql`);
        });
    });
}
