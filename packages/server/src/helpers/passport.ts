import { logger } from '@trumpsaid/common';
import { User } from '@trumpsaid/prisma';
import prismaContext from '@trumpsaid/prisma/dist/prismaContext';
import { Request } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-auth0';

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
  accessToken: string;
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
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN,
    responseType: 'code',
    scope: 'openid profile',
  },
  async (accessToken: string, refreshToken: string, extraParams: any, profile: IAuth0StrategyProfile, done: any) => {
    let user = undefined;
    const graphUserExists = await prismaContext.exists.User({ auth0Id: profile.user_id });
    try {
      if (!graphUserExists) {
        user = await prismaContext.mutation.createUser(
          {
            data: {
              auth0Id: profile.user_id,
              avatar: profile.picture,
              displayName: profile.displayName,
              givenName: profile.name.givenName,
              familyName: profile.name.familyName,
            },
          },
          '{ id auth0Id avatar displayName givenName familyName role }');
      } else {
        // get User
        user = await prismaContext.query.user(
          { where: { auth0Id: profile.user_id } }, ' { id auth0Id avatar displayName givenName familyName role } ');
        if (user) {
          user = await prismaContext.mutation.updateUser({
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

      profile.accessToken = accessToken;
      profile.localUser = user as ILocalUser;
      return done(null, profile);
    } catch (err) {
      logger.error(`Error finding or creating new user: ${err}`);
    }
  },
);

passport.use(strategy);

interface ISerializedUser {
  id: string;
  accessToken: string;
}

passport.serializeUser((user: IAuth0StrategyProfile, done) => {
  const args: ISerializedUser = { id: user.id, accessToken: user.accessToken };
  done(null, args);
});

export interface IPassportUser extends User {
  accessToken?: string;
}

passport.deserializeUser(async (user: ISerializedUser, done) => {
  try {
    const graphUser: IPassportUser =
      await prismaContext.query.user({ where: { auth0Id: user.id } }, ' { id auth0Id avatar displayName familyName givenName role } ');
    graphUser.accessToken = user.accessToken;
    done(null, graphUser);
  } catch (err) {
    logger.error(`Error deserializing user with ID: ${user.id}\n${err}`);
  }
});
