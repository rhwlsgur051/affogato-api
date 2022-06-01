import { Service } from "typedi";
import bcrypt from "bcrypt";
import { UserError } from "../../common/error/UserError";
import { User } from "../../graphql/user/entity/User.entity";
import { Equal } from "typeorm";
import { FollowRequest } from "../../graphql/user/api/FollowRequest";
import { Follow } from "../../graphql/user/entity/Follow.entity";
import { ChangePasswordRequest } from "../../graphql/user/api/UserRequest";
import { GlobalError } from "../../common/error/GlobalError";
import { AuthError } from "../../common/error/AuthError";
import _ from "lodash";

@Service()
export class UserChangeService {
  /** 사용자 생성 */
  async create(body: any) {
    const rUser = await User.findOne({
      where: [{ id: Equal(body.id) }, { email: Equal(body.email) }],
    });

    if (rUser) {
      throw new Error("Duplicated");
    }

    return await User.insert(body);
  }

  /** 사용자 비밀번호 변경 */
  async changePassword(body: ChangePasswordRequest) {
    const { userSeq, oldPassword, newPassword, newPasswordConfirm } = body;

    const rUser = await User.findOne({
      userSeq: Equal(userSeq),
    });

    if (!rUser) {
      throw new Error("Not Found");
    }

    const isCorrect = await bcrypt.compareSync(oldPassword, rUser.password);

    if (!isCorrect) {
      throw new GlobalError(UserError.USER002);
    }

    if (newPassword === newPasswordConfirm) {
      // 서버측에서 한번 더 유효성 검증
      rUser.password = newPassword;
      await rUser.save();
    }

    return true;
  }

  /** 친구 팔로잉 */
  async followUser(body: FollowRequest) {
    const rUser: any = await User.findOne(
      {
        userSeq: Equal(body.toUserSeq),
      },
      { relations: ["toUser"] }
    );

    const targetUser: any = await User.findOne({
      userSeq: Equal(body.fromUserSeq),
    });

    if (!rUser || !targetUser) {
      throw new GlobalError(UserError.USER001);
    }

    const isAvailable = _.isEmpty(
      await Follow.findOne({ where: { fromUser: rUser, toUser: targetUser } })
    );

    if (isAvailable) {
      const follow = new Follow(rUser, targetUser);
      await follow.save();
      return true;
    } else {
      throw new GlobalError(UserError.USER003);
    }
  }

  /** 팔로잉 취소 */
  async cancelToUser(ctx: any, followSeq: number) {
    if (!ctx) {
      throw new AuthError().AU002;
    }

    const follow = await Follow.findOne(followSeq, {
      relations: ["fromUser", "toUser"],
    });

    if (!follow || follow.fromUser.userSeq !== ctx.userSeq) {
      throw new GlobalError(UserError.USER004);
    }

    return await Follow.delete(followSeq);
  }
}
