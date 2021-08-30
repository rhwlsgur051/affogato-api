import { Service } from 'typedi';
import { Args, Mutation, Query, Resolver } from 'type-graphql';
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

  @Mutation(() => Boolean)
  createUser(@Args() body: UserType.CreateRequest) {
    console.log('====>', body);
    return this.userChangeService.create(body)
  }
}
