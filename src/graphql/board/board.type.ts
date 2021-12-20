import { ArgsType, Field, Int, ObjectType } from "type-graphql";

// 등록 요청객체
@ArgsType()
export class CreateRequest {
    @Field()
    userSeq?: number;

    @Field()
    title!: string;

    @Field()
    content!: string;
}

// 단건조회 요청객체
@ArgsType()
export class FindOneBoardRequest {
    @Field(type => Int, { nullable: false })
    boardSeq?: number;
}

// 응답객체
@ObjectType()
export class BoardResponse {
    @Field()
    boardSeq!: number;
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
