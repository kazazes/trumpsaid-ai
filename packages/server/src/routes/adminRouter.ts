import { checkJWT } from '@trumpsaid/common';
import { NextFunction, Response, Router } from 'express';
import { IRequestWithUser } from '../helpers/passport';

// Base route is /admin
const router = Router();

const isAuthenticated = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  if (req.user && req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

interface IVueResponse extends Response {
  renderVue: any;
}

router.all('*', isAuthenticated, checkJWT);

router.get('/', (req, res: IVueResponse, next) => {
  res.render('admin/admin', { title: 'Admin', hideSearch: true });
});

export default router;
