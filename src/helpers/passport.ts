import passport from 'passport';
import { Strategy } from 'passport-auth0';
import secrets from '../util/secrets';

const strategy = new Strategy(
  {
    domain: secrets.AUTH0_DOMAIN,
    clientID: secrets.AUTH0_CLIENT_ID,
    clientSecret: secrets.AUTH0_SECRET,
    callbackURL: secrets.AUTH0_CALLBACK_URL,
  },
  (accessToken: string, refreshToken: string, extraParams: any, profile: any, done: any) => {
    return done(null, profile);
  },
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
