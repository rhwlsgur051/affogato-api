import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthError } from '../../common/error/AuthError';
import { Service } from 'typedi';
import { User } from '../../graphql/user/entity/User.entity';
import { Equal } from 'typeorm';

@Service()
export class AuthService {
    auth = async (body: { id: string, password: string }) => {
        // 이메일로 사용자 조회
        const user = await User.findOne({ id: Equal(body.id) })

        if (!user) {
            throw new AuthError().AU001;
        }
        const isCorrect = await bcrypt.compareSync(body.password, user.password)

        if (!isCorrect) {
            throw new AuthError().AU001;
        }

        const token = jwt.sign({
            name: user.name,
            id: user.id
        }, process.env.JWT_SECRET_KEY || '', {
            expiresIn: '1d'
        });

        return {
            token,
            name: user.name,
            userSeq: user.userSeq,
            id: user.id,
        };
    }
}
