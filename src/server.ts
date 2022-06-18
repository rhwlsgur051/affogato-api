"use strict";
import * as _ from 'lodash';
import express from "express";
import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";
import "reflect-metadata";
import { AuthChecker, buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { AuthResolver } from "./graphql/auth/auth.resolver";
import Container from "typedi";
import { UserResolver } from "./graphql/user/user.resolver";
import { FeedResolver } from "./graphql/feed/feed.resolver";
import { setEnv } from "./config";
import { User } from "./graphql/user/entity/User.entity";
import { GraphQLError } from "graphql";
import { IncomingMessage } from "http";

async function bootstrap() {
  await setEnv();

  // ! --- Apollo Server Settings START
  const resolvers: any = [
    AuthResolver, // 인증
    UserResolver, // 사용자
    FeedResolver, // 피드
    // TODO 채팅
  ];

  const schema = await buildSchema({
    resolvers,
    validate: false,
    container: Container,
    authChecker: ({ context, args, info, root }) => {
      console.log(info);
      // here we can read the user from context
      // and check his permission in the db against the `roles` argument
      // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

      console.log('hello authchecker', info.fieldName);

      if (!context.user) {
        throw new GraphQLError('jwt expired');
      }
      return true; // or false if access is denied
    },
  });

  /** GraphQL 플레이그라운드 지원 여부*/
  const playground = true;

  /** 프론트에게 스택트레이스 제공 여부 */
  const debug = false;

  /** 요청 컨텍스트 */
  const context = async ({ req }: any) => {
    const request: IncomingMessage = req;
    if (request.headers.authorization) {
      try {
        const verify = jwt.verify(
          request.headers.authorization.substr(7),
          process.env.JWT_SECRET_KEY || ""
        );

        const context = {
          user: verify
        }
        return context;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  };

  // /** 에러 로그를 위한 에러 포맷 */
  // const formatError = (error: any) => {
  //   console.log('in');
  //   console.error("--- GraphQL Error ---");
  //   console.error("Name:", error.name);
  //   console.error("Path:", error.path);
  //   console.error("Message:", error.message);
  //   console.error("Code:", error.extensions.code);
  //   console.error("Original Error", error.originalError);
  //   return error;
  // };

  const server = new ApolloServer({
    schema,
    playground,
    context,
    // formatError,
    debug,
  });

  // ! --- Apollo Server Settings END

  const app = express();
  app.use(express.json({ limit: "5mb" }));

  server.applyMiddleware({
    app,
    path: "/api",
  });

  const port = 4000;

  await createConnection();
  console.log(`\u001b[32mTypeOrm Connected\u001b[0m`);
  app.listen(port, async () => {
    console.log(`\u001b[32mServer Listening at ${port} \u001b[0m`);

    await initUsers();
  });
}

async function initUsers(): Promise<any> {
  const userCount = await User.count();
  if (userCount < 1) {
    await User.insert({
      name: "고진혁",
      password: "1234",
      email: "rhwlsgur051@gmail.com",
      id: "hyucbird",
    });
    await User.insert({
      name: "우정아",
      password: "1234",
      email: "gogel0118@gmail.com",
      id: "chao",
    });

    await User.insert({
      name: "홍길동1",
      password: "1234",
      email: "hong1@gmail.com",
      id: "hong1",
    });

    await User.insert({
      name: "홍길동2",
      password: "1234",
      email: "hong2@gmail.com",
      id: "hong2",
    });
  }
}

bootstrap();
