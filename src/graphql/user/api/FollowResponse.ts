import { Field, ObjectType } from "type-graphql";
import { User } from "../entity/User.entity";
import { UserResponse } from "./UserResponse";
@ObjectType()
export class FollowResponse {
    @Field()
    followSeq!: number;
    @Field()
    fromUser!: UserResponse;
    @Field()
    toUser!: UserResponse;
}
