import { logger } from '@trumpsaid/common';
import { prismaContext, User } from '@trumpsaid/prisma';
import { Request } from 'express';
import { Strategy } from 'passport-auth0';

export interface IRequestWithUser extends Request {
  user: User;
}

interface ISerializedUser {
  id: string;
  accessToken: string;
}

export interface IPassportUser extends User {
  accessToken?: string;
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
  },
  async (
    accessToken: string,
    refreshToken: string,
    extraParams: any,
    profile: IAuth0StrategyProfile,
    done: any,
  ) => {
    let user;
    const graphUserExists = await prismaContext.exists.User({
      auth0Id: profile.user_id,
    });
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
          '{ id auth0Id avatar displayName givenName familyName role }',
        );
      } else {
        // get User
        user = await prismaContext.query.user(
          { where: { auth0Id: profile.user_id } },
          ' { id auth0Id avatar displayName givenName familyName role } ',
        );
        if (user) {
          user = await prismaContext.mutation.updateUser({
            data: {
              avatar: profile.picture,
              displayName: profile.displayName,
              givenName: profile.name.givenName,
              familyName: profile.name.familyName,
            },
            where: { auth0Id: profile.user_id },
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

export function serializeUser(
  user: IAuth0StrategyProfile,
  done: (err: any, id?: {}) => void,
) {
  const args: ISerializedUser = { id: user.id, accessToken: user.accessToken };
  done(null, args);
}

export async function deserializeUser(
  user: ISerializedUser,
  done: (err: any, id?: {}) => void,
) {
  try {
    const graphUser: IPassportUser = await prismaContext.query.user(
      { where: { auth0Id: user.id } },
      ' { id auth0Id avatar displayName familyName givenName role } ',
    );
    graphUser.accessToken = user.accessToken;
    done(null, graphUser);
  } catch (err) {
    logger.error(`Error deserializing user with ID: ${user.id}\n${err}`);
  }
}

export default strategy;
