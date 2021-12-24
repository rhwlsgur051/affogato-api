import { Field, ObjectType } from "type-graphql";
import { Follow } from "../entity/Follow.entity";
import { User } from "../entity/User.entity";

@ObjectType()
export class UserResponse {
    @Field()
    name!: string;
    @Field()
    email!: string;
    @Field()
    userSeq!: string;
    @Field(type => [User], { nullable: true })
    followings!: [User]
    @Field()
    checked!: boolean;
}

@ObjectType()
export class OtherUserResponse {
    @Field()
    name!: string;
    @Field()
    email!: string;
    @Field()
    userSeq!: string;
    @Field()
    isSynced!: boolean;
    @Field({ nullable: true })
    checekd!: boolean;
}