import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserResponse {
    @Field()
    id!: string;
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
    id!: string;
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