import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class FollowRequest {
    @Field()
    followingUserSeq!: number;

    @Field()
    followerUserSeq!: number;

}