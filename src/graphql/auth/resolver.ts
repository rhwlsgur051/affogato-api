import { login } from '../../controllers/AuthController';
import { AuthenticationError } from 'apollo-server-express';

export const authResolver = {
  Mutation: {
    login: (root: any, args: any, { user }: { user: any }) => {
      if (!user) throw new AuthenticationError('Not Authenticated');
      return login(args);
    }
  }
}