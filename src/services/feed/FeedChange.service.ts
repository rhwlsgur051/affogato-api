import { CreateRequest } from "../../graphql/feed/api/FeedRequest";
import { Feed } from "../../graphql/feed/entity/Feed.entity";
import { Service } from "typedi";
import { User } from "../../graphql/user/entity/User.entity";
import { Equal } from "typeorm";

@Service()
export class FeedChangeService {
  // 피드 생성
  async create(body: CreateRequest) {
    const userSeq = body.userSeq;
    try {
      if (userSeq) {
        const rUser = await User.findOne(
          { userSeq: Equal(userSeq) },
          { relations: ["feeds"] }
        );
        const cFeed = new Feed(body.title, body.content, false);
        rUser?.feeds.push(cFeed);
        rUser?.save();
      }
    } catch (error) {
      console.error(error);
    }

    return true;
  }

  // 피드 삭제
  async delete(feedSeq: number) {
    await Feed.update(
      {
        feedSeq,
      },
      {
        isDeleted: true,
      }
    );

    return true;
  }
}
