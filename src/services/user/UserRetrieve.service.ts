import * as _ from "lodash";
import { Service } from "typedi";
import { User } from "../../graphql/user/entity/User.entity";
import { Equal, In, Not, QueryBuilder } from "typeorm";
import { UserError } from "../../common/error/UserError";
import { Follow } from "../../graphql/user/entity/Follow.entity";
import { GlobalError } from "../../common/error/GlobalError";

@Service()
export class UserRetrieveService {
  /** 사용자 목록 조회
   *
   * @param userSeq 요청자 PK
   */
  async find(userSeq?: number) {
    const conditions: any = {};
    if (userSeq) {
      conditions.userSeq = Not(userSeq);
    }
    const rUsers = await User.find(conditions);

    return rUsers;
  }

  /**
   * 사용자 목록 조회
   * @param userSeq 사용자 PK
   */
  async findOne(userSeq: number) {
    const conditions: any = {
      userSeq: Equal(userSeq),
    };

    const rUser = await User.findOne(conditions);
    if (!rUser) {
      throw new GlobalError(UserError.USER001);
    }
    return rUser;
  }

  /**
   * 사용자 팔로잉 목록 조회
   * @param userSeq 요청자 PK
   */
  async findFromUserList(userSeq: number) {
    const rFromUsers: any = await Follow.find({
      where: {
        fromUser: Equal(userSeq)
      },
      relations: ['toUser', 'fromUser']
    });

    return rFromUsers;
  }

  /**
   * 사용자 팔로워 조회
   * @param userSeq 사용자 PK
   * */
  async findToUserList(userSeq: number) {
    const allMyFollows: Follow[] = await Follow.find({
      where: [
        {
          toUser: Equal(userSeq),
        },
        {
          fromUser: Equal(userSeq),
        }
      ],
      relations: ['toUser', 'fromUser']
    });

    const toUserFollows: any = _.filter(allMyFollows, follow => follow.toUser.userSeq === userSeq) // 피구독 데이터

    toUserFollows.forEach((follow: any) => {
      const canFollow = _.isUndefined(_.find(allMyFollows, amFollow => amFollow.fromUser.userSeq === userSeq));
      follow.canFollow = canFollow;
    })

    return toUserFollows;
  }

  /**
   * 요청자, 팔로우, 팔로잉 제외 사용자목록 조회
   * @param userSeq 사용자 PK
   *
   */
  async findOtherUserList(userSeq: number) {
    const rFromUsers: any = await Follow.find({
      where: {
        fromUser: Equal(userSeq)
      },
      relations: ['toUser', 'fromUser']
    });

    const otherIds = _.map(_.map(rFromUsers, 'toUser'), 'userSeq');

    const rUsers: User[] = await User.find({
      where: {
        userSeq: Not(In(otherIds.concat(userSeq)))
      }
    });
    // TODO 위 로직을 한번의 DB조회로 만들 것
    return rUsers;
  }
}
