import { NextFunction, Response, Router } from 'express';
import checkJwt from '../helpers/checkJWT';
import { IRequestWithUser } from '../helpers/passport';

// Base route is /admin
const router = Router();

const isAdmin = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.redirect('/login');
  }
};

interface IVueResponse extends Response {
  renderVue: any;
}

router.all('*', isAdmin, checkJwt);

router.get('/', (req, res: IVueResponse, next) => {
  res.render('admin/admin', { title: 'Admin', hideSearch: true });
});

export default router;