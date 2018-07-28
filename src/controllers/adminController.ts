import { Router } from 'express';
import { NextFunction } from '../../node_modules/@types/express-serve-static-core';

const router = Router;

const isAdmin = (req: Express.Request, res: Express.Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
};
