// export const userSchema = gql`

// # Query
// extend type Query {
//     users:[User],
//     getUser(id:Int): User
// }

// # Mutation
// extend type Mutation {
//     createUser(body: UserRequest): UserResponse
// }

// # 요청 타입
// input UserRequest {
//     name:String!,
//     userId:String!,
//     password: String!,
// }

// # 반환 타입
// type User {
//     id: Int,
//     name: String,
//     userId:String,
//     projects: [Project]
// }

// # 반환 타입
// type UserResponse {
//     name: String,
//     userId: String,
// }

// # Projects: 자식테이블
// type Project {
//     title:String, 
//     members: [User]
// }
// `;


import { ArgsType, Field, ObjectType } from "type-graphql";

// 요청객체
@ArgsType()
export class CreateRequest {
    @Field()
    userId?: string;

    @Field()
    name!: string;

    @Field()
    password!: string;
}

// 응답객체
@ObjectType()
export class UserResponse {
    @Field()
    userId!: string;
    @Field()
    name!: string;
}
