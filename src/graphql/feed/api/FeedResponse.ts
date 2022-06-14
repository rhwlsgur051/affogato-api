import { Field, ObjectType } from "type-graphql";
import { UserResponse } from "../../user/api/UserResponse";

@ObjectType()
export class FeedResponse {
  @Field()
  feedSeq!: number;
  @Field((type) => UserResponse)
  user!: UserResponse;
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
