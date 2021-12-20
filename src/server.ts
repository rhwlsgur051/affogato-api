'use strict'
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import db from './models';
import jwt from 'jsonwebtoken';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './graphql/auth/auth.resolver';
import Container from 'typedi';
import { UserResolver } from './graphql/user/user.resolver';
import { ChatResolver } from './graphql/chat/chat.resolver';
import { BoardResolver } from './graphql/board/board.resolver';

async function bootstrap() {
    const resolvers: any = [
        AuthResolver, // 인증
        UserResolver, // 사용자
        // ChatResolver, // 채팅
        BoardResolver // 게시판
    ];

    // resolvers: [__dirname + "/**/*.resolver.ts"],
    const schema = await buildSchema({
        resolvers,
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

        app.listen(port, async () => {
            console.log(`\u001b[32mServer Listening at ${port} \u001b[0m`)

            const dbUsers = await db.User.findAll();

            if (!dbUsers.length) {
                // 사용자 생성
                await db.User.create({
                    name: '고진혁',
                    password: '1234',
                    email:'rhwlsgur051@gmail.com',
                });

                await db.User.create({
                    name: '우정아',
                    password: '1234',
                    email:'gogel0118@gmail.com',
                });
            } 

            // const user = await db.User.findAll({
            // })
            // console.log(user[0]);

        });
    });
}

bootstrap();