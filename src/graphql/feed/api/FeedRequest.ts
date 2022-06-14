import { ArgsType, Field, Int } from "type-graphql";

// 등록 요청객체
@ArgsType()
export class CreateRequest {
  @Field()
  userSeq?: number;

  @Field()
  title!: string;

  @Field()
  content!: string;
}

// 단건조회 요청객체
@ArgsType()
export class FindOneFeedRequest {
  @Field((type) => Int, { nullable: false })
  feedSeq?: number;
}
