import { Prisma, User } from '@trumpsaid/prisma';
import prismaContext from '@trumpsaid/prisma/dist/prismaContext';
import { importSchema } from 'graphql-import';
import { applyMiddleware } from 'graphql-middleware';
import resolvers from './resolvers';
import shield from './resolvers/Shield';

import { Config } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

interface IPassportUser extends User {
  accessToken?: string;
}

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
