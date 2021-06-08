import db from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const auth = async ({ body }: { body: any }) => {
    // 이메일로 사용자 조회
    const user = await db.User.findOne(
        {
            where: {
                email: body.email
            }
        })

    if (!user) {
        throw ({ statusCode: 404, message: "NotFound" })
    }
    const isCorrect = await bcrypt.compareSync(body.password, user.password);

    if (!isCorrect) {
        throw new Error('UnAuthorized')
    }

    const token = jwt.sign({
        email: user.email,
        name: user.name
    }, process.env.JWT_SECRET_KEY || '')

    return {
        token,
        email: user.email,
        name: user.name
    }
}
