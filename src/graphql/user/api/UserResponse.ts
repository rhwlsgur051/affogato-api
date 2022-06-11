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
    userSeq!: number;
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
    userSeq!: number;
}