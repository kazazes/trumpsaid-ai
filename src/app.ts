import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import expressFlash from 'express-flash';
import expressSession from 'express-session';
import expressValidator from 'express-validator';
import lusca from 'lusca';
import passport from 'passport';
import path from 'path';

import graphServer from './graphql/apollo';

import adminRouter from './routes/adminRouter';
import authRouter from './routes/authRouter';
import rootRouter from './routes/rootRouter';

import secrets from './util/secrets';

const app = express();
require('./helpers/passport');

// tslint:disable-next-line:variable-name
const RedisStore = require('connect-redis')(expressSession);

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('hostname', process.env.HOST || '127.0.0.1');
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(expressFlash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }),
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

/**
 * Primary app routes.
 */
app.use('/', authRouter);
app.use('/', rootRouter);
app.use('/admin', adminRouter);

graphServer.applyMiddleware({ app });

export default app;
