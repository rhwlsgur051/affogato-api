import { AuthenticationError } from "apollo-server-express";

export class AuthError {
    public readonly AU001 = new AuthenticationError('등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.');
}