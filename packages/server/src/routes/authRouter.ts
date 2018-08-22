import logger from '@tswtf/util/logger';
import { Router } from 'express';
import passport from 'passport';

// Base route is /
const router = Router();

interface IAuth0PassportConfig {
  clientId: string;
  domain: string;
  redirectUri: string;
  audience: string;
  responseType: string;
  scope: string;

}

router.get(
  '/login',
  passport.authenticate('auth0', {
    clientId: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
    redirectUri: process.env.AUTH0_CALLBACK_URL,
    audience: process.env.AUTH0_AUDIENCE,
    responseType: 'code',
    scope: 'openid profile',
  } as IAuth0PassportConfig),
  (_, res) => {
    res.redirect('/');
  });

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get(
  '/login/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/',
  }),
  (req, res) => {
    logger.info(`Logged in user ${req.user.displayName} with ID ${req.user.user_id}`);
    res.redirect(`/admin?token=${req.user.accessToken}`);
  },
);

export default router;
