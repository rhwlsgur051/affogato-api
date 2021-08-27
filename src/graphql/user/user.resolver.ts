import { Service } from 'typedi';
import { Mutation, Query, Resolver } from 'type-graphql';
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

  @Query(() => [UserType.UserResponse])
  findUserList() {
    return this.userRetrieveService.find();
  }

  // @Mutation()
  // createChat(@Args() body: ChatType.CreateRequest) {
  //   return this.chatChangeService.create(body)
  // }
}
