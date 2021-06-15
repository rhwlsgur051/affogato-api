import { auth } from '../../controllers/AuthController';

export const authResolver = {
  Mutation: {
    auth: (root: any, args: any, { user }: { user: any }) => {
      return auth(args);
    }
  }
}