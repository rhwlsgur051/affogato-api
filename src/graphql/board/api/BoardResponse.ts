import { User } from "../../user/entity/User.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class BoardResponse {
    @Field()
    boardSeq!: number;
    @Field(type => User)
    user!: User;
    @Field()
    title!: string;
    @Field()
    content!: string;
    @Field()
    createdAt!: Date;
    @Field()
    updatedAt!: Date;
    @Field()
    isDeleted!: boolean;
}
