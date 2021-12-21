import { UserError } from "../../common/UserError";
import { Service } from "typedi";
import db from "../../models";
import { Op } from "sequelize";

@Service()
export class UserRetrieveService {
    // 사용자 목록 조회
    async find(userSeq?: number) {
        const conditions: any = {
            where: {
                [Op.not]: [
                    { userSeq: userSeq || '' }
                ],
            }
        };
        const users = await db.User.findAll({
            ...conditions,
            include:'friends'
        });
        
        return users;
    }

    // 사용자 단건 조회
    async findOne(userSeq: number) {
        const rUser = await db.User.findOne({
            where: {
                userSeq
            }
        });

        if (!rUser) {
            throw new UserError().USER001;
        }

        return rUser;
    }
}
