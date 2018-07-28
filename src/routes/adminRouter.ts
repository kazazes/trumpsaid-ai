import { NextFunction, Response, Router } from 'express';
import passport from 'passport';
import { IRequestWithUser } from '../helpers/passport';
import logger from '../util/logger';
import secrets from '../util/secrets';

// Base route is /admin
const router = Router();

const isAdmin = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(401).send('You need to be an admin to access that');
  }
};

router.all('*', isAdmin);

router.get('/', (req, res, next) => {
  res.render('admin/admin', { title: 'Admin', hideSearch: true });
});

export default router;
