import { Prisma } from './generated/prisma';

export interface IContext {
  db: Prisma;
  request: any;
}
