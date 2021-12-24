import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthError } from '../../common/error/AuthError';
import { Service } from 'typedi';
import { User } from '../../graphql/user/entity/User.entity';
import { Equal } from 'typeorm';

@Service()
export class AuthService {
    auth = async (body: { email: string, password: string }) => {
        // 이메일로 사용자 조회
        const user = await User.findOne({ email: Equal(body.email) })

        if (!user) {
            throw new AuthError().AU001;
        }
        const isCorrect = await bcrypt.compareSync(body.password, user.password)

        if (!isCorrect) {
            throw new AuthError().AU001;
        }

        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET_KEY || '');

        return {
            token,
            name: user.name,
            userSeq: user.userSeq,
            email: user.email,
        };
    }
}
