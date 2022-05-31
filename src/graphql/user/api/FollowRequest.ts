import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class FollowRequest {
    @Field()
    toUserSeq!: number;

    @Field()
    fromUserSeq!: number;
}
