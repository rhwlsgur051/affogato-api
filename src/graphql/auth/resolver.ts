import { auth } from '../../controllers/AuthController';
// import { AuthenticationError } from 'apollo-server-express';

export const authResolver = {
  Mutation: {
    auth: (root: any, args: any, { user }: { user: any }) => {
      return auth(args);
    }
  }
}