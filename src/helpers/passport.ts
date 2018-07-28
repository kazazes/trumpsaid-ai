import { Request } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-auth0';
import { User } from '../generated/prisma';
import Prisma from '../prismaContext';
import logger from '../util/logger';
import secrets from '../util/secrets';

export interface IRequestWithUser extends Request {
  user: User;
}

interface IAuth0StrategyProfile {
  displayName: string;
  user_id: string;
  picture: string;
  localUser: ILocalUser;
  id: string;
  name: IAuth0Name;
}

interface IAuth0Name {
  familyName: string;
  givenName: string;
}

interface ILocalUser {
  id: string;
  auth0Id: string;
  avatar: string;
  displayName: string;
  role: string;
  givenName: string;
  familyName: string;
}

const strategy = new Strategy(
  {
    domain: secrets.AUTH0_DOMAIN,
    clientID: secrets.AUTH0_CLIENT_ID,
    clientSecret: secrets.AUTH0_SECRET,
    callbackURL: secrets.AUTH0_CALLBACK_URL,
  },
  async (accessToken: string, refreshToken: string, extraParams: any, profile: IAuth0StrategyProfile, done: any) => {
    let user = undefined;
    const graphUserExists = await Prisma.exists.User({ auth0Id: profile.user_id });
    try {
      if (!graphUserExists) {
        user = await Prisma.mutation.createUser(
          {
            data: {
              auth0Id: profile.user_id,
              avatar: profile.picture,
              displayName: profile.displayName,
              givenName: profile.name.givenName,
              familyName: profile.name.givenName,
            },
          },
          '{ id auth0Id avatar displayName givenName familyName role }');
      } else {
        // get User
        user = await Prisma.query.user({ where: { auth0Id: profile.user_id } }, ' { id auth0Id avatar displayName givenName familyName role } ');
        if (user) {
          user = await Prisma.mutation.updateUser({
            data: {
              avatar: profile.picture,
              displayName: profile.displayName,
              givenName: profile.name.givenName,
              familyName: profile.name.familyName,
            }, where: { auth0Id: profile.user_id },
          });

        } else {
          throw new Error('Error fetching and updating user from DB');
        }
      }

      profile.localUser = user as ILocalUser;
      return done(null, profile);
    } catch (err) {
      logger.error(`Error finding or creating new user: ${err}`);
    }

  },
);

passport.use(strategy);

passport.serializeUser((user: IAuth0StrategyProfile, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await Prisma.query.user({ where: { auth0Id: id } }, ' { id auth0Id avatar displayName familyName givenName role } ');
    done(null, user);
  } catch (err) {
    logger.error(`Error deserializing user with ID: ${id}\n${err}`);
  }
});
