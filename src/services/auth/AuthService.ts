import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthError } from '../../common/error/AuthError';
import { Service } from 'typedi';
import { User } from '../../graphql/user/entity/User.entity';
import { Equal } from 'typeorm';
import { GraphQLError } from 'graphql';

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
            id: user.id,
            userSeq: user.userSeq,
        }, process.env.JWT_SECRET_KEY || '', {
            expiresIn: '3s'
        });

        const rToken = jwt.sign({}, process.env.JWT_SECRET_KEY || '', {
            expiresIn: '5m'
        });

        return {
            token,
            rToken,
            name: user.name,
            userSeq: user.userSeq,
            id: user.id,
        };
    }

    getNewToken = async (userSeq: number, rToken: string) => {
        try {
            jwt.verify(rToken, process.env.JWT_SECRET_KEY || "")
        } catch (error) {
            throw new GraphQLError('refresh token is expired')
        }

        const user = await User.findOne({ userSeq: Equal(userSeq) }); // 식별자로 사용자 조회

        if (!user) {
            throw new AuthError().AU001;
        }

        const token = jwt.sign({
            name: user.name,
            id: user.id,
            userSeq: user.userSeq,
        }, process.env.JWT_SECRET_KEY || '', {
            expiresIn: '5s'
        });

        return token;
    }
}
