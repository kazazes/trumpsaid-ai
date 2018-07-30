import { IApolloContext } from '../../apollo';
import { VideoUploadCreateInput } from '../../generated/prisma';

export default {
  createVideoUpload: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    const data: VideoUploadCreateInput = {
      submitedBy: { connect: { id: ctx.user.id } },
      status: 'AWAITING_PROCESSING',
      submittedUrl: args.url,
    };
    const upload = await ctx.db.mutation.createVideoUpload(
      {
        data,
      },
      ' { id status submittedUrl submitedBy { id displayName } }',
    );

    return upload;
  },
};
