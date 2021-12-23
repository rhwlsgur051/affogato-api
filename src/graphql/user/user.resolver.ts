import { Service } from 'typedi';
import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { UserChangeService } from '../../services/user/UserChange.service';
import { UserRetrieveService } from '../../services/user/UserRetrieve.service';
import { CreateRequest, ChangePasswordRequest } from './api/UserRequest';
import { UserResponse } from './api/UserResponse';
@Service()
@Resolver()
export class UserResolver {
  constructor(
    private readonly userChangeService: UserChangeService,
    private readonly userRetrieveService: UserRetrieveService
  ) { }

  /**
   * 사용자 목록조회
   * 
   * 기본적으로 자신의 데이터는 제외한다.
   * @returns 사용자 목록 배열
   */
  @Query(() => [UserResponse])
  findUserList(@Ctx() ctx: any) {
    let userSeq = null;
    if (ctx.user) {
      userSeq = ctx.user.dataValues.userSeq;
    }
    return this.userRetrieveService.find(userSeq);
  }

  // 사용자 단건조회
  @Query(() => UserResponse)
  findUser(@Arg('userSeq') userSeq: number) {
    return this.userRetrieveService.findOne(userSeq);
  }

  // 회원가입
  @Mutation(() => Boolean)
  createUser(@Args() body: CreateRequest) {
    return this.userChangeService.create(body)
  }

  // 비밀번호 변경
  @Mutation(() => Boolean)
  changePassword(@Args() body: ChangePasswordRequest) {
    return this.userChangeService.changePassword(body);
  }

}
