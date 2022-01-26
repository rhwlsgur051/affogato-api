import { Service } from "typedi";
import bcrypt from 'bcrypt';
import { UserError } from "../../common/error/UserError";
import { User } from "../../graphql/user/entity/User.entity";
import { Equal } from "typeorm";
import { AcceptFollowRequest } from "../../graphql/user/api/FollowRequest";
import { Follow } from "../../graphql/user/entity/Follow.entity";
import { ChangePasswordRequest } from "../../graphql/user/api/UserRequest";
import { GlobalError } from "../../common/error/GlobalError";

@Service()
export class UserChangeService {
    /** 사용자 생성 */
    async create(body: any) {
        const rUser = await User.findOne({
            email: Equal(body.email)
        })

        if (rUser) {
            throw new Error("Duplicated");
        }

        return await User.insert(body);
    }

    /** 사용자 비밀번호 변경 */
    async changePassword(body: ChangePasswordRequest) {
        const { userSeq, oldPassword, newPassword, newPasswordConfirm } = body;


        const rUser = await User.findOne({
            userSeq: Equal(userSeq)
        });

        if (!rUser) {
            throw new Error("Not Found");
        }

        const isCorrect = await bcrypt.compareSync(oldPassword, rUser.password)

        if (!isCorrect) {
            throw new GlobalError(UserError.USER002);
        }

        if (newPassword === newPasswordConfirm) { // 서버측에서 한번 더 유효성 검증
            rUser.password = newPassword;
            await rUser.save();
        }

        return true;
    }

    /** 친구 팔로잉 */
    async followUser(body: any) {
        const rUser: any = await User.findOne({
            userSeq: Equal(body.followingUserSeq)
        }, { relations: ['following'] });

        const targetUser: any = await User.findOne({
            userSeq: Equal(body.followerUserSeq)
        });

        if (!rUser || !targetUser) {
            throw new GlobalError(UserError.USER001);
        }

        const follow = new Follow(rUser,targetUser,false);
        await follow.save();
        // if (!rUser.following.includes(targetUser)) {
        //     rUser.following.push(targetUser);
        //     await rUser.save();
        // }

        return true;
    }

    /** 팔로우 수락 */
    async acceptFollow(body: AcceptFollowRequest) {
        const { userSeq, followSeq } = body;

        const rFollow: any = await Follow.findOne({
            where: {
                followSeq: Equal(followSeq)
            },
            relations: ['following', 'follower']
        });

        if (!rFollow || rFollow.follower.userSeq !== userSeq) {
            throw new GlobalError(UserError.USER001);
        }

        rFollow.checked = true;
        const result = await rFollow.save();
        return result.checked;
    }
}
