import { Field, ObjectType } from "type-graphql";
@ObjectType()
export class FollowResponse {
    @Field()
    followSeq!: number;
    @Field()
    id!: string;
    @Field()
    name!: string;
    @Field()
    email!: string;
    @Field()
    userSeq!: number;
    @Field()
    checked!: boolean;
    @Field()
    createdAt!: Date;
}
