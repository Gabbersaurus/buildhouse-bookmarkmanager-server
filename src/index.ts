import {ApolloServer} from 'apollo-server';
import typeDefs from '@/graphQL/typeDefs';
import resolvers from '@/graphQL/resolvers';
import {config} from 'dotenv';
import Context from './context';

const start = async () => {
    config();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context({req}) {
            const userId: number | null = null;
            const token = req.headers.authorization || '';

            return new Context(userId);
        },
    });

    const info = await server.listen({
        port: process.env.PORT,
    });

    console.log(`Bookmarkmanager ready at ${info.url}`);
};

void start();
