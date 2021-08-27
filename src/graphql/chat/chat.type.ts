import { ArgsType, Field, ObjectType } from "type-graphql";

// 요청객체
@ArgsType()
export class CreateRequest {
    @Field()
    content!: string;
}

// 응답객체
@ObjectType()
export class ChatResponse {
    @Field()
    Content!: string;
}
