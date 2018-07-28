import { PrismaOptions } from '../node_modules/prisma-binding/dist/types';
import { Prisma } from './generated/prisma';
import secrets from './util/secrets';

const prismaOptions: PrismaOptions = {
  typeDefs: 'src/generated/prisma.graphql',
  secret: secrets.PRISMA_SECRET,
  endpoint: secrets.PRISMA_ENDPOINT,
};

export default new Prisma(prismaOptions);
