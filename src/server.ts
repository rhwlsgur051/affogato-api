'use strict'
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { AuthResolver } from './graphql/auth/auth.resolver';
import Container from 'typedi';
import { UserResolver } from './graphql/user/user.resolver';
import { BoardResolver } from './graphql/board/board.resolver';
import { setEnv } from './config';
import { User } from "./graphql/user/entity/User.entity";

async function bootstrap() {
    await setEnv();

    // ! --- Apollo Server Settings START
    const resolvers: any = [
        AuthResolver, // 인증
        UserResolver, // 사용자
        BoardResolver // 게시판
        // TODO 채팅
    ];

    const schema = await buildSchema({
        resolvers,
        validate: false,
        container: Container,
        authChecker: ({ context }) => {
            // console.log('--->',context);
            return true;
        }
    });

    /** GraphQL 플레이그라운드 지원 여부*/
    const playground = true;

    /** 프론트에게 스택트레이스 제공 여부 */
    const debug = false;

    /** 인증절차 컨텍스트 */
    const context = async (req: any) => {
        const { headers } = req.req;
        if (headers.authorization) {
            try {
                const verify = jwt.verify(headers.authorization.substr(7), process.env.JWT_SECRET_KEY || '');
                return verify;
            } catch (error: any) {
                throw error
            }

        } else {
            return true;
        }
    }

    /** 에러 로그를 위한 에러 포맷 */
    const formatError = (error: any) => {
        console.error("--- GraphQL Error ---");
        console.error("Name:", error.name);
        console.error("Path:", error.path);
        console.error("Message:", error.message);
        console.error("Code:", error.extensions.code);
        console.error("Original Error", error.originalError);
        return error;
    };

    const server = new ApolloServer({
        schema,
        playground,
        context,
        formatError,
        debug
    });

    // ! --- Apollo Server Settings END

    const app = express();
    app.use(express.json());

    server.applyMiddleware({
        app,
        path: '/api'
    });

    const port = 4000;

    await createConnection();
    console.log(`\u001b[32mTypeOrm Connected\u001b[0m`)
    app.listen(port, async () => {
        console.log(`\u001b[32mServer Listening at ${port} \u001b[0m`)

        await initUsers();
    });
}

async function initUsers(): Promise<any> {
    const userCount = await User.count();
    if (userCount < 1) {
        await User.insert({
            name: '고진혁',
            password: '1234',
            email: 'rhwlsgur051@gmail.com',
            id: 'hyucbird',
        });
        await User.insert({
            name: '우정아',
            password: '1234',
            email: 'gogel0118@gmail.com',
            id: 'chao',
        });

        await User.insert({
            name: '홍길동1',
            password: '1234',
            email: 'hong1@gmail.com',
            id:'hong1',
        });

        await User.insert({
            name: '홍길동2',
            password: '1234',
            email: 'hong2@gmail.com',
            id: 'hong2',
        });
    }
}

bootstrap();