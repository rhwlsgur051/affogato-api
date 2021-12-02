import { Service } from 'typedi';
import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { UserChangeService } from '../../services/user/UserChange.service';
import { UserRetrieveService } from '../../services/user/UserRetrieve.service';
import * as UserType from './user.type';

@Service()
@Resolver()
export class UserResolver {
  constructor(
    private readonly userChangeService: UserChangeService,
    private readonly userRetrieveService: UserRetrieveService
  ) { }

  // 사용자 목록조회
  @Query(() => [UserType.UserResponse])
  findUserList() {
    return this.userRetrieveService.find();
  }

  // 사용자 단건조회
  @Query(() => UserType.UserResponse)
  findUser(@Arg('id') id: number) {
    return this.userRetrieveService.findOne(id);
  }

  // 회원가입
  @Mutation(() => Boolean)
  createUser(@Args() body: UserType.CreateRequest) {
    return this.userChangeService.create(body)
  }

  // 비밀번호 변경
  @Mutation(() => Boolean)
  changePassword(@Args() body: UserType.ChangePasswordRequest) {
    return this.userChangeService.changePassword(body);
  }

}
