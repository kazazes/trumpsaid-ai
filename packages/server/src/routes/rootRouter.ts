import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  res.render('home', { title: 'Home' });
});

router.get('/privacy', (_, res) => {
  res.render('privacy', { title: 'Privacy Policy' });
});

export default router;
