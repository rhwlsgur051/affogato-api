import db from "../../models";

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

}
