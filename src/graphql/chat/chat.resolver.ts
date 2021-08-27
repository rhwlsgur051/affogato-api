import { Service } from 'typedi';
import { Args, Mutation, Query, Resolver } from 'type-graphql';
import { ChatChangeService } from '../../services/chat/ChatChange.service';
import { ChatRetrieveService } from '../../services/chat/ChatRetrieve.service';
import * as ChatType from './chat.type';


@Service()
@Resolver()
export class ChatResolver {
  constructor(
    private readonly chatChangeService: ChatChangeService,
    private readonly chatRetrieveService: ChatRetrieveService
  ) { }

  @Query(() => [ChatType.ChatResponse])
  findChatList() {
    return this.chatRetrieveService.find();
  }

  @Mutation(()=>Boolean)
  createChat(@Args() body: ChatType.CreateRequest): any {
    this.chatChangeService.create(body);
  }
}