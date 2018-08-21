import { IApolloContext } from '../../apollo';
import prismaContext from '../../prismaContext';

export default {
  allSpeakers: (obj: any, args: any, ctx: IApolloContext, info: any) => {
    return prismaContext.query.speakers({}, ' { name avatarPath title } ');
  },
};
