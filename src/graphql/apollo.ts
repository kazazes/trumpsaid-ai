import { importSchema } from 'graphql-import';
import { IPassportUser } from '../helpers/passport';
import { Prisma } from './generated/prisma';
import prismaContext from './prismaContext';
import resolvers from './resolvers';

const { ApolloServer } = require('apollo-server-express');

const typeDefs = importSchema('./src/graphql/schema.graphql');

interface IExpressContext {
  req: Express.Request;
  res: Express.Response;
}

export interface IApolloContext {
  user: IPassportUser;
  db: Prisma;
}

const apolloConfig = {
  typeDefs,
  resolvers,
  cors: false,
  context: (ctx: IExpressContext) => ({
    user: ctx.req.user as IPassportUser,
    db: prismaContext,
  } as IApolloContext),
};

const server = new ApolloServer(apolloConfig);
server.playgroundOptions.settings['request.credentials'] = 'include';

export default server;
