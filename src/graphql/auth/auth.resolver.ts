import { Service } from 'typedi';
import { Mutation, Resolver, Args, Query, Authorized, Arg } from 'type-graphql';
import { AuthService } from '../../services/auth/AuthService';
import { AuthResponse, AuthRequest } from './auth.type';

@Service()
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ) { }

  //! Query 1개 이상 필수
  @Query(() => String)
  defaultQuery() { return 'AuthResolver Alive' }

  @Mutation(() => AuthResponse)
  auth(@Args() body: AuthRequest) {
    return this.authService.auth(body);
  }

  @Mutation(() => String)
  getNewToken(@Arg('userSeq') userSeq: number, @Arg('rToken') rToken: string): Promise<string> {
    return this.authService.getNewToken(userSeq, rToken);
  }

}