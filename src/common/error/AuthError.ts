import { AuthenticationError } from "apollo-server-express";

export class AuthError {
    /** 등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다. */
    public readonly AU001 = new AuthenticationError('등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.');
    public readonly AU002 = new AuthenticationError('인증정보를 찾을 수 없습니다.');
}