import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Home' });
});

export default router;
