import prismaContext from '@trumpsaid/prisma/dist/prismaContext';
import { IApolloContext } from '../../apollo';

export default {
  videoUploads: (obj: any, args: any, ctx: IApolloContext, info: any) => {
    return prismaContext.query.videoUploads({}, info);
  },
  videoUpload: (obj: any, args: any, ctx: IApolloContext, info: any) => {
    return prismaContext.query.videoUpload({ where: { id: args.id } }, info);
  },
};
