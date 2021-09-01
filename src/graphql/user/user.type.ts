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
