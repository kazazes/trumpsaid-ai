import prismaContext from '@trumpsaid/prisma/dist/prismaContext';
import { IApolloContext } from '../../apollo';

export default {
  allSpeakers: (obj: any, args: any, ctx: IApolloContext, info: any) => {
    return prismaContext.query.speakers({}, ' { name avatarPath title } ');
  },
};
