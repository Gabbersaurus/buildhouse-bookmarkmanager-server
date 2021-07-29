import 'reflect-metadata';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import typeDefs from '@/graphQL/typeDefs';
import resolvers from '@/graphQL/resolvers';
import {config} from 'dotenv';
import Context from './Context';
import {createConnection} from 'typeorm';
import ConnectionContainer from './ConnectionContainer';
import applyFaviconRoute from './express/applyFaviconRoute';
import applyBackgroundRoute from './express/applyBackgroundRoute';

const start = async () => {
    //Load config
    config();

    //Validate config
    if (!process.env.SECRET) {
        throw new Error('Secret key not set');
    }

    //Load database
    ConnectionContainer.connection = await createConnection();

    //Create Express & Apollo server
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) => Context.create(req.headers.authorization || ''),
    });

    server.applyMiddleware({app});
    applyFaviconRoute(app);
    applyBackgroundRoute(app);

    await app.listen({
        port: process.env.PORT,
    });

    console.log(
        `Bookmarkmanager ready at http://localhost:` + process.env.PORT,
    );
};

void start();
