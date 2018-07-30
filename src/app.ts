import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import expressFlash from 'express-flash';
import expressSession from 'express-session';
import expressValidator from 'express-validator';
import { Options } from 'graphql-binding';
import lusca from 'lusca';
import morgan, { Options as MorganOptions } from 'morgan';
import passport from 'passport';
import path from 'path';

import graphServer from './graphql/apollo';

import adminRouter from './routes/adminRouter';
import authRouter from './routes/authRouter';
import rootRouter from './routes/rootRouter';

import checkJWT from './helpers/checkJWT';
import logger from './util/logger';
import secrets from './util/secrets';

const app = express();

require('./helpers/passport');

// tslint:disable-next-line:variable-name
const RedisStore = require('connect-redis')(expressSession);

// Express configuration
// tslint:disable-next-line:no-magic-numbers
app.set('port', process.env.PORT || 3000);
app.set('hostname', process.env.HOST || '127.0.0.1');
app.set('views', './views');
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(expressFlash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

const staticPath = path.join('./dist/public');

app.use(
  express.static(staticPath, { maxAge: 31557600000 }),
);

app.use(
  expressSession({
    store: new RedisStore({
      host: secrets.REDIS_HOST,
      port: secrets.REDIS_PORT,
    }),
    secret: secrets.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      expires: false,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

const morganFormat: string = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, { stream: { write: message => logger.info(message) } }));

/**
 * Primary app routes.
 */
app.use('/', authRouter);
app.use('/', rootRouter);
app.use('/admin', adminRouter);
app.use('/graphql', checkJWT);

graphServer.applyMiddleware({ app });

export default app;
