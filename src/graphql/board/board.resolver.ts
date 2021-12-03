import { Service } from 'typedi';
import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { BoardChangeService } from '../../services/board/BoardChange.service';
import { BoardRetrieveService } from '../../services/board/BoardRetrieve.service';
import * as BoardType from './board.type';

@Service()
@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardChangeService: BoardChangeService,
    private readonly boardRetrieveService: BoardRetrieveService
  ) { }

  @Query(() => [BoardType.BoardResponse])
  findBoardList() {
    return this.boardRetrieveService.find();
  }

  @Query(() => BoardType.BoardResponse)
  findBoard(@Args() { id }: BoardType.FindOneBoardRequest) {
    return this.boardRetrieveService.findOne(id);
  }

  @Mutation(() => Boolean)
  createBoard(@Args() { userSeq, title, content }: BoardType.CreateRequest) {
    return this.boardChangeService.create({ userSeq, title, content });
  }

  @Mutation(() => Boolean)
  deleteBoard(@Arg('boardId') boardId: number) {
    return this.boardChangeService.delete(boardId);
  }
}

