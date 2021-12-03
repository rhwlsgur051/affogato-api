import { ArgsType, Field, ObjectType } from "type-graphql";

// 요청객체
@ArgsType()
export class CreateRequest {
    @Field()
    email?: string;

    @Field()
    name!: string;

    @Field()
    password!: string;
}

// 비밀번호 변경 요청객체
@ArgsType()
export class ChangePasswordRequest {
    @Field()
    id!: number;
    
    @Field()
    oldPassword!: string;

    @Field()
    newPassword!: string;

    @Field()
    newPasswordConfirm!: string;
}

// 응답객체
@ObjectType()
export class UserResponse {
    @Field()
    name!: string;
    @Field()
    email!: string;
    @Field()
    id!: string;
}
