import db from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async ({ body }: { body: any }) => {
    const user = await db.User.findOne(
        {
            where: {
                email: body.email
            }
        })

    if (!user) {
        throw new Error("NotFound")
    }

    const isCorrect = await bcrypt.compare(body.password, user.password);

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
