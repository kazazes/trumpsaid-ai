import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import secrets from '../util/secrets';

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${secrets.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  getToken: (req) => { if (req.user && req.user.accessToken) { return req.user.accessToken; } },
  requestProperty: 'auth',
  audience: secrets.AUTH0_AUDIENCE,
  issuer: 'https://sibyl.auth0.com/',
  algorithms: ['RS256'],
});

export default checkJwt;
