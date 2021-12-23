import { Service } from "typedi";
import bcrypt from 'bcrypt';
import { UserError } from "../../common/error/UserError";
import { User } from "../../graphql/user/entity/User.entity";
import { Equal } from "typeorm";

@Service()
export class UserChangeService {
    // 사용자 생성
    async create(body: any) {
        const rUser = await User.findOne({
            email: Equal(body.email)
        })

        if (rUser) {
            throw new Error("Duplicated");
        }

        return await User.insert(body);
    }

    // 사용자 비밀번호 변경
    async changePassword(body: any) {
        const rUser = await User.findOne({
            userSeq: Equal(body.userSeq)
        });

        if (!rUser) {
            throw new Error("Not Found");
        }

        const isCorrect = await bcrypt.compareSync(body.oldPassword, rUser.password)

        if (!isCorrect) {
            throw new UserError().USER002;
        }

        if (body.newPassword === body.newPasswordConfirm) {
            rUser.password = body.newPassword;
            await rUser.save();
        }

        return true;
    }
}
