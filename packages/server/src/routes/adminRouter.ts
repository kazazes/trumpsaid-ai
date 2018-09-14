import { checkJWT } from '@trumpsaid/common';
import { Response, Router } from 'express';
import { isAuthenticated } from './authRouter';

// Base route is /admin
const router = Router();

interface IVueResponse extends Response {
  renderVue: any;
}

router.all('*', isAuthenticated, checkJWT);

router.get('/', (req, res: IVueResponse, next) => {
  res.render('admin/admin', { title: 'Admin', hideSearch: true });
});

export default router;
