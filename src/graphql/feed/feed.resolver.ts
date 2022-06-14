import { Service } from "typedi";
import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { FeedChangeService } from "../../services/feed/FeedChange.service";
import { FeedRetrieveService } from "../../services/feed/FeedRetrieve.service";
import { FeedResponse } from "./api/FeedResponse";
import { FindOneFeedRequest } from "./api/FeedRequest";
import { CreateRequest } from "./api/FeedRequest";

@Service()
@Resolver()
export class FeedResolver {
  constructor(
    private readonly feedChangeService: FeedChangeService,
    private readonly feedRetrieveService: FeedRetrieveService
  ) {}

  @Query(() => [FeedResponse])
  @Authorized()
  findFeedList() {
    return this.feedRetrieveService.find();
  }

  @Query(() => FeedResponse)
  findFeed(@Args() { feedSeq }: FindOneFeedRequest) {
    return this.feedRetrieveService.findOne(feedSeq);
  }

  @Mutation(() => Boolean)
  createFeed(@Args() { userSeq, title, content }: CreateRequest) {
    return this.feedChangeService.create({ userSeq, title, content });
  }

  @Mutation(() => Boolean)
  deleteFeed(@Arg("feedSeq") feedSeq: number) {
    return this.feedChangeService.delete(feedSeq);
  }
}
