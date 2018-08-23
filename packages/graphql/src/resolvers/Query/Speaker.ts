import { IApolloContext } from '../../apollo';

import prismaContext from '@trumpsaid/prisma/dist/prismaContext';

export default {
  allSpeakers: (obj: any, args: any, ctx: IApolloContext, info: any) => {
    return prismaContext.query.speakers({}, ' { name avatarPath title } ');
  },
};
