import { PrismaOptions } from 'prisma-binding/dist/types';
import secrets from '../util/secrets';
import { Prisma } from './generated/prisma';

export const prismaEndpoint = secrets.PRISMA_ENDPOINT + (process.env.NODE_ENV === 'production' ? 'production' : 'development');

const prismaOptions: PrismaOptions = {
  typeDefs: 'src/graphql/generated/prisma.graphql',
  secret: secrets.PRISMA_SECRET,
  endpoint: prismaEndpoint,
};

const prisma = new Prisma(prismaOptions);

export default prisma;
