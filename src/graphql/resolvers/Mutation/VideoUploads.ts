import { ApolloError } from 'apollo-server-core';
import { isURL } from 'validator';
import { IApolloContext } from '../../apollo';
import { VideoUploadCreateInput } from '../../generated/prisma';

export default {
  createVideoUpload: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    if (!isURL(args.url, { require_protocol: true })) {
      return new ApolloError('The submited URL was invalid.');
    }

    const data: VideoUploadCreateInput = {
      submitedBy: { connect: { id: ctx.user.id } },
      status: 'AWAITING_PROCESSING',
      submitedUrl: args.url,
    };

    const upload = await ctx.db.mutation.createVideoUpload({ data }, info);

    return upload;
  },
  deleteVideoUpload: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    return ctx.db.mutation.deleteVideoUpload({ where: { id: args.id } });
  },
};
