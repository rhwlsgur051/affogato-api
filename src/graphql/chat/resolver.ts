import db from '../../models';
import { createChat } from '../../controllers/ChatController';

export const chatResolver = {
  Query: {
    getChats: async () => await db.Chat.findAll(),
  },
  Mutation: {
    createChat: async (root: any, args: any, { chat }: { chat: any }) => createChat(args)
  }
}