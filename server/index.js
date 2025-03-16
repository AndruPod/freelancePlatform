import express from 'express';
import sequelize from "./db.js";
import models from './models/models.js';
import { ApolloServer} from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import {resolvers} from "./resolvers/resolver.js";
import cors from "cors";
import http from "http";
import {typeDefs} from './schema.js';
import jwt from "jsonwebtoken";
import createContext from "./utils/context.js";

const PORT = process.env.PORT;

const app = express();
const httpServer = http.createServer(app);

const server =  new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
})

const start = async () => {
    try {

        await sequelize.authenticate();
        await sequelize.sync();

        await server.start();

        app.use('/graphql',
            cors(),
            express.json(),
            expressMiddleware(server,{
                    context: createContext
                }
            ),
        )

        httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));

    } catch(e) {
        console.error(e);
    }
}

start();