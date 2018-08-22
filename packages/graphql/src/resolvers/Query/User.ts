import prismaContext from '@trumpsaid/prisma/dist/prismaContext';
import { IApolloContext } from '../../apollo';

export default {
  me: (obj: any, args: any, ctx: IApolloContext, info: any) => {
    return prismaContext.query.user({ where: { auth0Id: ctx.user.auth0Id } },
                                    '{ id adminRoles givenName familyName displayName role auth0Id avatar }');
  },
};
