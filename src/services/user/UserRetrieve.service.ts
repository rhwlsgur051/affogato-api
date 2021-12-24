import * as _ from 'lodash';
import { Service } from "typedi";
import { User } from "../../graphql/user/entity/User.entity";
import { Equal, Not } from "typeorm";
import { UserError } from "../../common/error/UserError";
import { Follow } from '../../graphql/user/entity/Follow.entity';

@Service()
export class UserRetrieveService {
    // 사용자 목록 조회
    async find(userSeq?: number) {
        const conditions: any = {};
        if (userSeq) {
            conditions.userSeq = Not(userSeq);
        }
        const rUsers = await User.find(conditions);

        return rUsers;
    }

    // 사용자 단건 조회
    async findOne(userSeq: number) {
        const conditions: any = {
            userSeq: Equal(userSeq)
        }

        const rUser = await User.findOne(conditions);
        if (!rUser) {
            throw new UserError().USER001;
        }
        return rUser;
    }

    // 사용자 팔로잉 조회
    async findUserFollowingList(userSeq: number) {
        const rFollows: any = await Follow.find({
            where: {
                following: Equal(userSeq)
            },
            relations: ['follower']
        });

        _.forEach(rFollows, follow => {
            follow.follower.checked = follow.checked;
        });

        return _.map(rFollows, 'follower');
    }

    async findOtherUserList(userSeq: number) {
        const rUser: any = await User.findOne({ userSeq: Equal(userSeq) }, { relations: ['following'] });
        const rOtherUsers: any = await User.find({ where: { userSeq: Not(userSeq) }, relations: ['following'] });

        _.forEach(rOtherUsers, otherUser => {
            const followUser = _.find(rUser.following, follow => follow === otherUser);
            otherUser.isSynced = !_.isUndefined(followUser);

            if (otherUser.isSynced) {
                otherUser.checked = followUser.checked;
            }
        });

        return rOtherUsers;
    }
}
