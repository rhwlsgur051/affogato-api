import * as _ from 'lodash';
import { Service } from "typedi";
import { User } from "../../graphql/user/entity/User.entity";
import { Equal, Not } from "typeorm";
import { UserError } from "../../common/error/UserError";
import { Follow } from '../../graphql/user/entity/Follow.entity';

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
            userSeq: Equal(userSeq)
        }

        const rUser = await User.findOne(conditions);
        if (!rUser) {
            throw new UserError().USER001;
        }
        return rUser;
    }

    /** 
     * 사용자 팔로잉 목록 조회
     * @param userSeq 요청자 PK
    */
    async findUserFollowingList(userSeq: number) {
        const rFollows: any = await Follow.find({
            where: [
                { follower: Equal(userSeq) },
                { following: Equal(userSeq) }
            ],
            relations: ['following', 'follower']
        });

        const followings: any[] = [];

        _.forEach(rFollows, follow => {
            if (follow.following.userSeq === userSeq) { // 현재 사용자가 팔로잉 한 경우 팔로워 Push
                follow.follower.followSeq = follow.followSeq;
                follow.follower.checked = follow.checked;
                followings.push(follow.follower);
            } else if (follow.checked) { // 현재 사용자가 팔로우 당한 경우 수락여부로 팔로잉 Push
                follow.following.followSeq = follow.followSeq;
                follow.following.checked = follow.checked;
                followings.push(follow.following);
            }
        })

        /** 이름순 정렬 */
        const resultFollowings = _.sortBy(followings, 'name');

        return resultFollowings;
    }

    /** 
     * 사용자 팔로워 조회 
     * @param userSeq 사용자 PK
     * */
    async findUserFollowerList(userSeq: number) {
        const rFollows: any = await Follow.find({
            where: [ // ! OR
                { following: Equal(userSeq) },
                { follower: Equal(userSeq) }
            ],
            relations: ['following', 'follower'],
            order: {
                checked: 'ASC' // checked:0 요청상태 먼저 정렬한다.
            },
        });

        const followers: any[] = [];

        _.forEach(rFollows, follow => {
            if (follow.following.userSeq === userSeq && follow.checked) { // 현재 사용자가 팔로잉 한 경우 상대방의 수락여부로 팔로워 Push
                follow.follower.followSeq = follow.followSeq;
                follow.follower.checked = follow.checked;
                followers.push(follow.follower);
            } else {
                follow.following.followSeq = follow.followSeq;
                follow.following.checked = follow.checked;
                followers.push(follow.following);
            }
        });

        /** 이름순으로 정렬. 요청상태 [1-1]를 우선한다. */
        const resultFollowers = _.merge(
            _.sortBy(_.filter(followers, follow => !follow.checked), 'name'), // 요청상태 [1-1]
            _.sortBy(_.filter(followers, follow => follow.checked), 'name')
        )

        return resultFollowers;
    }

    /**
     * 요청자, 팔로우, 팔로잉 제외 사용자목록 조회
     * @param userSeq 사용자 PK
     * 
     */
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
