import { checkJWT, logger } from '@trumpsaid/common';
import { apollo as graphServer } from '@trumpsaid/graphql';
import bodyParser from 'body-parser';
import compression from 'compression';
import connectRedis from 'connect-redis';
import express from 'express';
import expressFlash from 'express-flash';
import expressSession from 'express-session';
import expressValidator from 'express-validator';
import gitRev from 'git-rev-sync';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';

import strategy, { deserializeUser, serializeUser } from './helpers/passport';
import adminRouter from './routes/adminRouter';
import authRouter from './routes/authRouter';
import rootRouter from './routes/rootRouter';

// import csrf from "csurf";
// import lusca from "lusca";
const app = express();
const env = process.env.NODE_ENV;

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
// app.use(lusca.xframe("SAMEORIGIN"));
// app.use(lusca.xssProtection(true));

const staticPath = path.join('../client/dist');
app.use(express.static(staticPath, { maxAge: 31557600000 }));

// tslint:disable-next-line:variable-name
const RedisStore = connectRedis(expressSession);

app.locals.env = env;
app.locals.gitHash = gitRev.short();
app.locals.gitBranch = gitRev.branch();

app.use(
  expressSession({
    store: new RedisStore({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      expires: false,
    },
  }),
);

passport.use(strategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/graphql', checkJWT);
graphServer.applyMiddleware({ app });

const morganFormat: string =
  process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(
  morgan(morganFormat, {
    stream: {
      write: message =>
        logger.debug(message.substring(0, message.lastIndexOf('\n'))),
    },
  }),
);

/**
 * Primary routes.
 */
app.use('/', authRouter);
app.use('/', rootRouter);
app.use('/admin', adminRouter);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (err.status === 401) {
      res.redirect('/login');
    } else {
      next();
    }
  },
);

export default app;
