import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FollowResponse {
    @Field()
    createdAt!: string;
}