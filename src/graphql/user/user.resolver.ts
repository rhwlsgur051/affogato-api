import { Service } from 'typedi';
import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { UserChangeService } from '../../services/user/UserChange.service';
import { UserRetrieveService } from '../../services/user/UserRetrieve.service';
import { CreateRequest, ChangePasswordRequest } from './api/UserRequest';
import { UserResponse, OtherUserResponse } from './api/UserResponse';
import { FollowRequest } from './api/FollowRequest';
import { FollowResponse } from './api/FollowResponse';

@Service()
@Resolver()
export class UserResolver {
  constructor(
    private readonly userChangeService: UserChangeService,
    private readonly userRetrieveService: UserRetrieveService
  ) { }

  //! ----- Default CRUD -----
  /**
   * 사용자 목록조회
   * 
   * 기본적으로 자신의 데이터는 제외한다.
   * @return User[]
   */
  @Query(() => [UserResponse])
  findUserList(@Ctx() ctx: any) {
    let userSeq = null;
    if (ctx.user) {
      userSeq = ctx.user.dataValues.userSeq;
    }
    return this.userRetrieveService.find(userSeq);
  }

  /** 사용자 단건조회 */
  @Query(() => UserResponse)
  findUser(@Arg('userSeq') userSeq: number) {
    return this.userRetrieveService.findOne(userSeq);
  }

  /** 회원가입 */
  @Mutation(() => Boolean)
  createUser(@Args() body: CreateRequest) {
    return this.userChangeService.create(body)
  }

  /** 비밀번호 변경 */
  @Mutation(() => Boolean)
  changePassword(@Args() body: ChangePasswordRequest) {
    return this.userChangeService.changePassword(body);
  }

  // ! ----- Custom CRUD -----
  /** 내가 팔로우하는 친구 목록 조회 */
  @Query(() => [FollowResponse])
  findFromUserList(@Arg('userSeq') userSeq: number) {
    return this.userRetrieveService.findFromUserList(userSeq);
  }

  /** 팔로워 목록 조회 */
  @Query(() => [FollowResponse])
  findToUserList(@Arg('userSeq') userSeq: number) {
    return this.userRetrieveService.findToUserList(userSeq);
  }

  /** 사용자 목록 조회 (본인제외) */
  @Query(() => [OtherUserResponse])
  findOtherUserList(@Arg('userSeq') userSeq: number) {
    return this.userRetrieveService.findOtherUserList(userSeq);
  }

  /** 사용자 팔로잉하기 */
  @Mutation(() => Boolean)
  followUser(@Args() body: FollowRequest) {
    return this.userChangeService.followUser(body);
  }

}
