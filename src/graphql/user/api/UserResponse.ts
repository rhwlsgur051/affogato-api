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