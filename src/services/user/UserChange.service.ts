import { Service } from "typedi";
import db from "../../models";

@Service()
export class UserChangeService {
    // 사용자 생성
    async create(body: any) {
        const rUser = await db.User.findOne({
            where: {
                userId: body.userId
            }
        })

        if (rUser) {
            throw new Error("Duplicated");
        }

        return await db.User.create(body);;
    }
    
}
