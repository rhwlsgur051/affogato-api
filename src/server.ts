'use strict'
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import db from './models';
import jwt from 'jsonwebtoken';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './graphql/auth/auth.resolver';
import Container from 'typedi';
import { UserResolver } from './graphql/user/user.resolver';
import { ChatResolver } from './graphql/chat/chat.resolver';

async function bootstrap() {

    // resolvers: [__dirname + "/**/*.resolver.ts"],
    const schema = await buildSchema({
        resolvers: [AuthResolver, UserResolver, ChatResolver],
        validate: false,
        container: Container
    });

    const server = new ApolloServer({
        schema,
        playground: true,
        context: async ({ req }) => {
            // if (!req.headers.authorization) throw new AuthenticationError("Need Token")
            if (!req.headers.authorization) return { user: undefined };
            const tUser: any = jwt.decode(req.headers.authorization.substr(7));

            const user = await db.User.findOne({
                where: {
                    email: tUser.email
                }
            })
            return { user };
        }
    });

    const app = express();
    app.use(express.json());

    server.applyMiddleware({
        app,
        path: '/api'
    });

    const port = 4000;
    db.sequelize.sync().then(async () => {
        console.log(`\u001b[32mSequelize Connected\u001b[0m`)

        app.listen(port, () => {
            console.log(`\u001b[32mServer Listening at ${port} \u001b[0m`)
        });

        // /**
        //  * 기초데이터 적재
        //  */
        // const userController = app.get(UserRetrieveService);
        //  new UserController();
        // const dbUsers = await userController.getUsers();
        // if (!dbUsers.length) {
        //     await db.User.bulkCreate(users);
        // }
    });
}

bootstrap();