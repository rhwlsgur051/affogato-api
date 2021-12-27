import { Field, ObjectType } from "type-graphql";
import { UserResponse } from "./UserResponse";
import { User } from "../entity/User.entity";

@ObjectType()
export class FollowResponse {
    @Field()
    followSeq!: number;
    @Field()
    checked!: boolean;
    @Field()
    createdAt!: string;
    @Field(type => UserResponse, { nullable: true })
    following!: UserResponse;
    @Field(type => UserResponse, { nullable: true })
    follower!: UserResponse;
}