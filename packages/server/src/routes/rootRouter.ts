import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  res.render('home', { title: 'Home' });
});

export default router;
