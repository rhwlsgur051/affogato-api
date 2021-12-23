import { Service } from "typedi";
import { User } from "../../graphql/user/entity/User.entity";
import { Equal, Not } from "typeorm";
import { UserError } from "../../common/error/UserError";

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
}
