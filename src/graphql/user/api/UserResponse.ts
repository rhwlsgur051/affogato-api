import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserResponse {
    @Field()
    name!: string;
    @Field()
    email!: string;
    @Field()
    userSeq!: string;
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