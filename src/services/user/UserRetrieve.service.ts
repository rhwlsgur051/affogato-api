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
        let rFollowings: any = await Follow.find({
            where: [
                { following: Equal(userSeq) },
                { follower: Equal(userSeq) },
            ],
            relations: ['following', 'follower']
        });

        rFollowings = _.filter(rFollowings, follow => {
            return follow.follower.userSeq === userSeq ? follow.isChecked : true
        });

        return rFollowings;
    }

    // 사용자 팔로잉 조회
    async findUserFollowerList(userSeq: number) {
        let rFollowers: any = await Follow.find({
            where: [ // ! OR
                { follower: Equal(userSeq) },
                { following: Equal(userSeq) }
            ],
            relations: ['following', 'follower']
        });

        rFollowers = _.filter(rFollowers, follow => {
            return follow.following.userSeq === userSeq ? follow.isChecked : true
        });

        return rFollowers;
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
