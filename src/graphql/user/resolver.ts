import db from '../../models';
import { createUser } from '../../controllers/UserController';

export const userResolver = {
  Query: {
    users: async () => await db.User.findAll(),
    getUser: async (root: any, args: any) => await db.User.findOne({ where: { id: args.id } })
  },
  Mutation: {
    createUser: async (root: any, args: any, { user }: { user: any }) => createUser(args)
  }
}