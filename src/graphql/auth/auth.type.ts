import { ArgsType, Field, ObjectType } from "type-graphql";

// 요청객체
@ArgsType()
export class AuthRequest {
    @Field()
    email!: string;
    @Field()
    password!: string;
}

// 응답객체
@ObjectType()
export class AuthResponse {
    @Field()
    name!: string;
    @Field()
    email!: string;
    @Field()
    token!: string;
    @Field()
    userSeq!: number;
}