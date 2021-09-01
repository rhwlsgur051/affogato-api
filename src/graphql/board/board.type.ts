import { ArgsType, Field, ObjectType } from "type-graphql";

// 요청객체
@ArgsType()
export class CreateRequest {
    @Field()
    userSeq?: number;

    @Field()
    title!: string;

    @Field()
    content!: string;
}

// 응답객체
@ObjectType()
export class BoardResponse {
    @Field()
    id!: number;
    @Field()
    userSeq!: number;

    @Field()
    title!: string;

    @Field()
    content!: string;

    @Field()
    userName!: string;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;

    @Field()
    isDeleted!: boolean;
}
