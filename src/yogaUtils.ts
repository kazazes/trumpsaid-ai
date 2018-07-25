import * as jwt from 'jsonwebtoken';
import { Prisma } from './generated/prisma';
import secrets from './util/secrets';

export interface IContext {
  db: Prisma;
  request: any;
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}
