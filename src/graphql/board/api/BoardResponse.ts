import { Field, ObjectType } from "type-graphql";

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
