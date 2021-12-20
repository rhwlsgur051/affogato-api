import { UserError } from "../../common/UserError";
import { Service } from "typedi";
import db from "../../models";

@Service()
export class UserRetrieveService {
    // 사용자 목록 조회
    async find() {
        const users = await db.User.findAll({
            include: {
                model: db.Project
            }
        });
        return users;
    }

    // 사용자 단건 조회
    async findOne(userSeq: number) {
        const user = await db.User.findOne({
            where: {
                userSeq
            }
        });

        if (!user) {
            throw new UserError().USER001;
        }

        return user;
    }
}
