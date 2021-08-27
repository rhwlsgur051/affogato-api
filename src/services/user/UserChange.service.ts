import db from "../../models";

export class UserChangeService {
    // 사용자 생성
    async createUser (body:any) {
        const rUser = await db.User.findOne({
            where: {
                email: body.email
            }
        })

        if (rUser) {
            throw new Error("Duplicated");
        }

        return await db.User.create(body);;
    }
}
