import { Service } from 'typedi';
import { Arg, Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { BoardChangeService } from '../../services/board/BoardChange.service';
import { BoardRetrieveService } from '../../services/board/BoardRetrieve.service';
import { BoardResponse } from './api/BoardResponse';
import { FindOneBoardRequest } from './api/BoardRequest';
import { CreateRequest } from '../../graphql/board/api/BoardRequest';

@Service()
@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardChangeService: BoardChangeService,
    private readonly boardRetrieveService: BoardRetrieveService
  ) { }

  @Query(() => [BoardResponse])
  @Authorized()
  findBoardList() {
    return this.boardRetrieveService.find();
  }

  @Query(() => BoardResponse)
  findBoard(@Args() { boardSeq }: FindOneBoardRequest) {
    return this.boardRetrieveService.findOne(boardSeq);
  }

  @Mutation(() => Boolean)
  createBoard(@Args() { userSeq, title, content }: CreateRequest) {
    return this.boardChangeService.create({ userSeq, title, content });
  }

  @Mutation(() => Boolean)
  deleteBoard(@Arg('boardSeq') boardSeq: number) {
    return this.boardChangeService.delete(boardSeq);
  }
}

