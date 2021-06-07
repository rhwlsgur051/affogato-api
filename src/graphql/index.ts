import { gql, makeExecutableSchema } from 'apollo-server-express';
import { authSchema } from './auth/type';
import { userSchema } from './user/type';
import { userResolver } from './user/resolver';
import { authResolver } from './auth/resolver';

const RootSchema = gql`
  type Query {
    root: String
  }
  type Mutation{
    root: String
  }
`;

const RootResolver = {
  Query: {
    root: () => 'Root resolver is running!',
  },
}; 

export const schema = makeExecutableSchema({
  typeDefs: [RootSchema, userSchema,authSchema],
  resolvers: [RootResolver, userResolver, authResolver],
});
