import { gql } from 'apollo-server-express';
import { Request } from 'express';
import fs from 'fs';
import { importSchema } from 'graphql-import';
import path from 'path';
import { Prisma } from 'prisma-binding';
import context from '../prismaContext';
import resolvers from './resolvers';

const { ApolloServer } = require('apollo-server-express');

const typeDefs = importSchema('./src/graphql/schema.graphql');

const apolloConfig = {
  typeDefs,
  resolvers,
  context: (req: any) => ({
    ...req,
    db: context,
  }),
};

const server = new ApolloServer(apolloConfig);

export default server;
