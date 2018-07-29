import { PrismaOptions } from 'prisma-binding/dist/types';
import secrets from '../util/secrets';
import { Prisma } from './generated/prisma';

const prismaOptions: PrismaOptions = {
  typeDefs: 'src/graphql/generated/prisma.graphql',
  secret: secrets.PRISMA_SECRET,
  endpoint: secrets.PRISMA_ENDPOINT,
};

export default new Prisma(prismaOptions);
