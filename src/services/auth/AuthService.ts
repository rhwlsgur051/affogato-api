import db from '../../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthError } from '../../common/AuthErrors';
import { Service } from 'typedi';

@Service()
export class AuthService {
    auth = async (body: { userId: string, password: string }) => {
        // 이메일로 사용자 조회
        const user = await db.User.findOne(
            {
                where: {
                    userId: body.userId
                }
            })

        if (!user) {
            throw new AuthError().AU001;
        }
        const isCorrect = await bcrypt.compareSync(body.password, user.password)

        if (!isCorrect) {
            throw new AuthError().AU001;
        }

        const token = jwt.sign({
            userId: user.userId,
            name: user.name
        }, process.env.JWT_SECRET_KEY || '')

        console.log('in');
        return {
            token,
            userId: user.userId,
            name: user.name
        }
    }
}
