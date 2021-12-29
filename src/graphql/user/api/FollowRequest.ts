import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class FollowRequest {
    @Field()
    followingUserSeq!: number;

    @Field()
    followerUserSeq!: number;
}

@ArgsType()
export class AcceptFollowRequest {
    @Field()
    userSeq!: number;
    @Field()
    followSeq!: number;
}