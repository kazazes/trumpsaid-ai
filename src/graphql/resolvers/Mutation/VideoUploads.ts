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
      status: 'AWAITING_PROCESSING',
      submitedUrl: args.url,
    };

    const upload = await ctx.db.mutation.createVideoUpload({ data }, info);

    return upload;
  },
  deleteVideoUpload: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    return ctx.db.mutation.deleteVideoUpload({ where: { id: args.id } });
  },
  downloadVideoUploadSources: async(obj: any, args: any, ctx: IApolloContext, info: any) => {
    const upload = await ctx.db.query.videoUpload({ where: { id: args.id } });
    publishDownloadJob(upload);
    return upload;
  },
  startProcessingPipeline: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    let upload = await ctx.db.query.videoUpload(
      { where: { id: args.id } },
      `{ id submitedUrl submitedBy { displayName avatar } status state rawStorageLink { videoID path bucket } }`);

    if (upload.state === 'PENDING' && upload.status === 'AWAITING_PROCESSING') {
      publishDownloadJob(upload);
      upload = await ctx.db.mutation.updateVideoUpload(
        { where: { id: args.id }, data: { state: 'PROCESSING' } }, ' { id status state submitedUrl } ');
    } else if (upload.state === 'PENDING' && upload.status === 'READY_TO_RENDER') {
      publishRenderJob(upload);
      upload = await ctx.db.mutation.updateVideoUpload(
        { where: { id: args.id }, data: { state: 'PROCESSING' } }, ' { id status state submitedUrl } ');
    } else if (upload.state === 'PENDING' && upload.status === 'NEEDS_REVIEW') {

    }

    return upload;
  },
  setVideoUploadThumbnail: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    const upload = await ctx.db.query.videoUpload(
      { where: { id: args.id } },
      `{ id submitedUrl submitedBy { displayName avatar } status state rawStorageLink { videoID path bucket } }`);

    if (upload) {
      publishThumbnailJob(upload, args.timestamp);
      return ctx.db.mutation.updateVideoUpload({ where: { id: upload.id }, data: { state: 'PROCESSING' } });
    }

    return new ApolloError('No video with that ID');

  },
  transcribe: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    // TODO: Set to processing, dispatch transcription job
    const upload = await ctx.db.mutation.updateVideoUpload(
      {
        where: { id: args.id },
        data: { state: 'PROCESSING', status: 'AWAITING_TRANSCRIPTION' },
      },
      ' { id status state flacLink { bucket path } } ');

    new VideoTranscriber(upload).recognize()
      .catch(e => logger.error(`Error while transcribing:\n ${e}`));

    return upload;
  },
};
