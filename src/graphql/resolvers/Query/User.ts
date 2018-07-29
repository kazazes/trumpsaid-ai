import { IApolloContext } from '../../apollo';
import prismaContext from '../../prismaContext';

export default {
  me: (obj: any, args: any, ctx: IApolloContext, info: any) => {
    return prismaContext.query.user({ where: { auth0Id: ctx.user.auth0Id } });
  },
};
