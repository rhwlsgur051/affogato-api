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
    email?: string;
    @Field()
    name?: string;
    @Field()
    token?: string;
}