import { PrismaOptions } from 'prisma-binding/dist/types';
import { Prisma } from './generated/prisma';

export const prismaEndpoint = process.env.PRISMA_ENDPOINT + (process.env.NODE_ENV === 'production' ? 'production' : 'development');

const prismaOptions: PrismaOptions = {
  typeDefs: 'src/graphql/generated/prisma.graphql',
  secret: process.env.PRISMA_SECRET,
  endpoint: prismaEndpoint,
};

const prismaContext = new Prisma(prismaOptions);

export default prismaContext;
