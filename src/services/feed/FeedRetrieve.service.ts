import { Feed } from "../../graphql/feed/entity/Feed.entity";
import { User } from "../../graphql/user/entity/User.entity";
import * as _ from "lodash";
import { Service } from "typedi";
import { Equal } from "typeorm";

import { FeedError } from "../../common/error/FeedError";
import { UserError } from "../../common/error/UserError";

@Service()
export class FeedRetrieveService {
  /** 피드 목록 조회 */
  async find() {
    const rFeeds: any = await Feed.find({
      where: {
        isDeleted: false,
      },
      order: {
        feedSeq: -1,
      },
      relations: ["user"],
    });

    return rFeeds;
  }

  /** 피드 단건 조회 */
  async findOne(feedSeq: any) {
    const rFeed = await Feed.findOne({
      where: {
        feedSeq,
        isDeleted: false,
      },
      relations: ["user"],
    });

    return rFeed;
  }
}
