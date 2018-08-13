import { IApolloContext } from '../../apollo';
import prisma from '../../prismaContext';

export default {
  allSpeakers: (obj: any, args: any, ctx: IApolloContext, info: any) => {
    return prisma.query.speakers({}, ' { name avatarPath title } ');
  },
};
