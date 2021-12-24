import { ArgsType, Field } from "type-graphql";

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

@ArgsType()
export class ChangePasswordRequest {
    @Field()
    userSeq!: number;

    @Field()
    oldPassword!: string;

    @Field()
    newPassword!: string;

    @Field()
    newPasswordConfirm!: string;
}
