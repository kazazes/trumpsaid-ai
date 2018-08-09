import { ApolloError } from 'apollo-server-core';
import { isURL } from 'validator';
import { VideoTranscriber } from '../../../gcloud/VideoTranscription/VideoTranscriber';
import { publishDownloadJob, publishRenderJob, publishThumbnailJob } from '../../../gcloud/VideoUploadJobPublisher';
import logger from '../../../util/logger';
import { IApolloContext } from '../../apollo';
import { VideoUploadCreateInput } from '../../generated/prisma';

export default {
  createVideoUpload: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    if (!isURL(args.url, { require_protocol: true })) {
      return new ApolloError('The submited URL was invalid.');
    }

    const data: VideoUploadCreateInput = {
      submitedBy: { connect: { id: ctx.user.id } },
      submitedUrl: args.url,
    };

    const upload = await ctx.db.mutation.createVideoUpload({ data }, info);

    return upload;
  },
  render: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    const upload = await ctx.db.query.videoUpload({ where: { id: args.id } });
    try {
      await publishRenderJob(upload);
      return upload;
    } catch (error) {
      logger.error(error);
      return new ApolloError('Error publishing render job. Check logs.');
    }
  },
  deleteVideoUpload: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    return ctx.db.mutation.deleteVideoUpload({ where: { id: args.id } });
  },
  downloadVideoUploadSources: async(obj: any, args: any, ctx: IApolloContext, info: any) => {
    const upload = await ctx.db.query.videoUpload({ where: { id: args.id } });
    publishDownloadJob(upload);
    return upload;
  },
  setVideoUploadThumbnail: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    const upload = await ctx.db.query.videoUpload(
      { where: { id: args.id } },
      `{ id submitedUrl submitedBy { displayName avatar } status state rawStorageLink { videoID path bucket } }`);

    if (upload) {
      publishThumbnailJob(upload, args.timestamp);
      return upload;
    }

    return new ApolloError('No video with that ID');

  },
  transcribe: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    // TODO: Set to processing, dispatch transcription job
    const upload =
    await ctx.db.query.videoUpload({ where: { id: args.id } }, ' { id storageLinks { version fileType bucket path videoUpload {id} } } ');

    new VideoTranscriber(upload).recognize()
      .catch(e => logger.error(`Error while transcribing:\n ${e}`));

    return upload;
  },
};
