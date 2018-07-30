import { importSchema } from 'graphql-import';
import { applyMiddleware } from 'graphql-middleware';
import { IPassportUser } from '../helpers/passport';
import { Prisma } from './generated/prisma';
import prismaContext from './prismaContext';
import resolvers from './resolvers';
import shield from './resolvers/Shield';

import { Config } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = importSchema('./src/graphql/schema.graphql');

const schema = makeExecutableSchema({ typeDefs, resolvers });
const protectedSchema = applyMiddleware(schema, shield);

interface IExpressContext {
  req: Express.Request;
  res: Express.Response;
}

export interface IApolloContext {
  user: IPassportUser;
  db: Prisma;
}

const apolloConfig: Config = {
  schema: protectedSchema,
  context: (ctx: IExpressContext) =>
    ({
      user: ctx.req.user as IPassportUser,
      db: prismaContext,
    } as IApolloContext),
};

const server = new ApolloServer(apolloConfig);

export default server;
