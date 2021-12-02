import { Service } from "typedi";
import bcrypt from 'bcrypt';
import db from "../../models";
import { UserError } from "../../common/UserError";

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

    // 사용자 비밀번호 변경
    async changePassword(body: any) {
        const rUser = await db.User.findOne({
            where: {
                id: body.id
            }
        });

        if (!rUser) {
            throw new Error("Not Found");
        }

        const isCorrect = await bcrypt.compareSync(body.oldPassword, rUser.password)

        if (!isCorrect) {
            throw new UserError().USER002;
        }

        if (body.newPassword === body.newPasswordConfirm) {
            await db.User.update({
                password: body.newPassword
            },
                {
                    where: {
                        id: body.id
                    }
                }
            );
        }

        return true;
    }
}
