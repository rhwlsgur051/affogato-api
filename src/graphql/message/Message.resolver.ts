import { Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { MessageResponse } from './api/MessageResponse';

@Service()
@Resolver()
export class MessageResolver {
    constructor(
    ) { }

    //! ----- Default CRUD -----
    /**
     * 특정 사용자 사이의 메세지 목록조회
     */
    //   @Query(() => [MessageResponse])
    //   findList(@Ctx() ctx: any) {
    //     let userSeq = null;
    //     if (ctx.user) {
    //       userSeq = ctx.user.dataValues.userSeq;
    //     }
    //   }

}
