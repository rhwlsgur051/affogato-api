import * as _ from "lodash";
import { Service } from "typedi";
import { User } from "../../graphql/user/entity/User.entity";
import { Equal, Not } from "typeorm";
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
    const rToUsers: any = await Follow.find({
      where: {
        toUser: Equal(userSeq)
      }
    });

    return rToUsers;
  }

  /**
   * 요청자, 팔로우, 팔로잉 제외 사용자목록 조회
   * @param userSeq 사용자 PK
   *
   */
  async findOtherUserList(userSeq: number) {
    const rUsers: User[] = await User.find({
      relations: ["toUser", "fromUser"],
    });

    const me = _.find(rUsers, user => user.userSeq === userSeq);

    const result = _.filter(rUsers, user => {
      return _.filter(user.fromUser, (fromUser: User) => {
        return fromUser.userSeq !== userSeq;
      }) && user !== me;
    });

    return result;
  }
}
