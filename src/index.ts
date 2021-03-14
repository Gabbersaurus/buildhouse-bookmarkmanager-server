import 'reflect-metadata';
import {ApolloServer} from 'apollo-server';
import typeDefs from '@/graphQL/typeDefs';
import resolvers from '@/graphQL/resolvers';
import {config} from 'dotenv';
import Context from './Context';
import {createConnection} from 'typeorm';
import ConnectionContainer from './ConnectionContainer';

const start = async () => {
    //Load config
    config();

    //Validate config
    if (!process.env.Secret) {
        throw new Error('Secret key not set');
    }

    //Load database
    ConnectionContainer.connection = await createConnection();

    //Create Apollo server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) => Context.create(req.headers.authorization || ''),
    });

    const info = await server.listen({
        port: process.env.PORT,
    });

    console.log(`Bookmarkmanager ready at ${info.url}`);
};

void start();
