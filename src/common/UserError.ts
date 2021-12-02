import { ForbiddenError,AuthenticationError } from "apollo-server-express";

export class UserError {
    public readonly USER001 = new ForbiddenError('사용자를 찾을 수 없습니다.');
    public readonly USER002 = new AuthenticationError('현재 비밀번호가 틀립니다.');
}