import logger from '@trumpsaid/common/logger';
import { VideoTranscriber } from '@trumpsaid/services/VideoTranscriber';
import { publishDownloadJob, publishRenderJob, publishThumbnailJob } from '@trumpsaid/services/VideoUploadJobPublisher';
import { ApolloError } from 'apollo-server-core';
import { isURL } from 'validator';
import { IApolloContext } from '../../apollo';
import { VideoUploadCreateInput } from '../../generated/prisma';
import prisma from '../../prismaContext';

export default {
  createVideoUpload: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    if (!isURL(args.url, { require_protocol: true })) {
      return new ApolloError('The submited URL was invalid.');
    }

    const data: VideoUploadCreateInput = {
      submitedBy: { connect: { id: ctx.user.id } },
      submitedUrl: args.url,
      metadata: {
        create: {
          renderStart: 0,
          renderEnd: 0,
        },
      },
    };

    const upload = await ctx.db.mutation.createVideoUpload({ data }, ' { id submitedUrl }');
    await publishDownloadJob(upload);

    return upload;
  },
  setInitialUploadMetadata: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    let upload = await ctx.db.mutation.updateVideoUpload(
      {
        data: { metadata: { update: {
          renderStart: args.renderStart,
          renderEnd: args.renderEnd,
          speakers: args.numberOfSpeakers } } },
        where: { id: args.id },
      },
      ' { id metadata { renderStart renderEnd speakers } submitedUrl storageLinks { id path bucket version fileType videoUpload { id } } }');

    const webStorageLinks = upload.storageLinks.filter(link => link.version === 'WEB').map(link => link.id);
    await prisma.mutation.deleteManyVideoUploadStorageLinks({ where: { id_in: webStorageLinks } });
    upload = await ctx.db.query.videoUpload(
      { where: { id: args.id } },
      ' { id metadata { renderStart renderEnd speakers } submitedUrl storageLinks { id path bucket version fileType videoUpload { id } } }');

    try {
      await publishRenderJob(upload);
      publishThumbnailJob(upload, args.thumbnailTimestamp);
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
    await publishDownloadJob(upload);
    return upload;
  },
  transcribe: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    // TODO: Set to processing, dispatch transcription job
    const upload =
    await ctx.db.query.videoUpload({ where: { id: args.id } }, ' { id storageLinks { version fileType bucket path videoUpload {id} } } ');

    new VideoTranscriber(upload).recognize()
      .catch((e: any) => logger.error(`Error while transcribing:\n ${e}`));

    return upload;
  },
  updateMetadata: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    const update = args.metadata;
    const upload = await ctx.db.query.videoUpload({ where: { id: args.id } }, ' { metadata { id }} ');
    const metadataId = upload.metadata.id;
    return ctx.db.mutation.updateVideoUploadMetadata({ data: update, where: { id: metadataId } });
  },
};
