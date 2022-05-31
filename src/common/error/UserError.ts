import { ErrorInterface } from "common/interface/ErrorInterface";

/**
 * 사용자 관련 오류 열거형 상수이다.
 */
export enum UserErrorEnum {
    USER001 = "USER001",
    USER002 = "USER002",
    USER003 = "USER003",
}

/**
 * 열거형 상수에 해당하는 오류 코드와 메시지이다.
 */
export const UserError: Readonly<{ [key in UserErrorEnum]: ErrorInterface }> = {
    [UserErrorEnum.USER001]: { code: "USER001", message: "사용자를 찾을 수 없습니다." },
    [UserErrorEnum.USER002]: { code: "USER002", message: "현재 비밀번호가 틀립니다." },
    [UserErrorEnum.USER003]: { code: "USER003", message: "이미 팔로우한 대상입니다." },

};