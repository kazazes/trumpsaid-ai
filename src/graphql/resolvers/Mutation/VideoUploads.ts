import { ApolloError } from 'apollo-server-core';
import { isURL } from 'validator';
import { publishDownloadJob } from '../../../gcloud/videoJobController';
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
  startProcessingPipeline: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    let upload = await ctx.db.query.videoUpload({ where: { id: args.id } });

    if (upload.state === 'PENDING') {
      await publishDownloadJob(upload);
      upload = await ctx.db.mutation.updateVideoUpload(
        { where: { id: args.id }, data: { state: 'PROCESSING' } }, ' { id status state submitedUrl } ');
    }

    return upload;
  },
};
