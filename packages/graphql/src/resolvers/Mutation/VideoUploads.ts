import { logger } from '@trumpsaid/common';
import {
  NewsSourceItemCreateInput,
  NewsSourceItemCreateManyInput,
  prismaContext as prisma,
  VideoUploadCreateInput,
  VideoUploadMetadataUpdateDataInput,
  VideoUploadMetadataUpdateInput,
} from '@trumpsaid/prisma';
import { publishDownloadJob, publishRenderJob, publishThumbnailJob } from '@trumpsaid/responders';
import { processNewsItemMetadata, VideoTranscriber } from '@trumpsaid/web-workers';
import { ApolloError } from 'apollo-server-core';
import normalizeUrl from 'normalize-url';
import { isURL } from 'validator';

import { IApolloContext } from '../../apollo';

// tslint:disable-next-line:no-var-requires
const nlp = require('compromise');

export default {
  createVideoUpload: async (
    obj: any,
    args: any,
    ctx: IApolloContext,
    info: any,
  ) => {
    if (!isURL(args.url, { require_protocol: true })) {
      return new ApolloError('The submited URL was invalid.');
    }

    const data: VideoUploadCreateInput = {
      metadata: {
        create: {
          renderStart: 0,
          renderEnd: 0,
        },
      },
      submitedBy: { connect: { id: ctx.user.id } },
      submitedUrl: args.url,
    };

    const upload = await ctx.db.mutation.createVideoUpload(
      { data },
      ' { id submitedUrl }',
    );
    await publishDownloadJob(upload);

    return upload;
  },
  setInitialUploadMetadata: async (
    obj: any,
    args: any,
    ctx: IApolloContext,
    info: any,
  ) => {
    let upload = await ctx.db.mutation.updateVideoUpload(
      {
        data: {
          metadata: {
            update: {
              renderStart: args.renderStart,
              renderEnd: args.renderEnd,
              speakers: args.numberOfSpeakers,
            },
          },
        },
        where: { id: args.id },
      },
      ' { id metadata { renderStart renderEnd speakers } submitedUrl storageLinks { id path bucket version fileType videoUpload { id } } }',
    );

    const webStorageLinks = upload.storageLinks
      .filter(link => link.version === 'WEB')
      .map(link => link.id);
    await prisma.mutation.deleteManyVideoUploadStorageLinks({
      where: { id_in: webStorageLinks },
    });
    upload = await ctx.db.query.videoUpload(
      { where: { id: args.id } },
      ' { id metadata { renderStart renderEnd speakers } submitedUrl storageLinks { id path bucket version fileType videoUpload { id } } }',
    );

    try {
      await publishRenderJob(upload);
      publishThumbnailJob(upload, args.thumbnailTimestamp);
      return upload;
    } catch (error) {
      logger.error(error);
      return new ApolloError('Error publishing render job. Check logs.');
    }
  },
  deleteVideoUpload: async (
    obj: any,
    args: any,
    ctx: IApolloContext,
    info: any,
  ) => {
    return ctx.db.mutation.deleteVideoUpload({ where: { id: args.id } });
  },
  publishVideoUpload: async (
    obj: any,
    args: any,
    ctx: IApolloContext,
    info: any,
  ) => {
    // TODO: Add checks for publishability
    logger.info(`${ctx.user.id} published ${args.id}`);
    return ctx.db.mutation.updateVideoUpload(
      { where: { id: args.id },
        data: {
          published: true,
          publishedBy: { connect: { id: ctx.user.id },
          },
        },
      });
  },
  downloadVideoUploadSources: async (
    obj: any,
    args: any,
    ctx: IApolloContext,
    info: any,
  ) => {
    const upload = await ctx.db.query.videoUpload({ where: { id: args.id } });
    await publishDownloadJob(upload);
    return upload;
  },
  transcribe: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    const upload = await ctx.db.query.videoUpload(
      { where: { id: args.id } },
      ' { id storageLinks { version fileType bucket path videoUpload {id} } } ',
    );

    new VideoTranscriber(upload)
      .recognize()
      .catch((e: any) => logger.error(`Error while transcribing:\n ${e}`));

    return upload;
  },
  updateMetadata: async (
    obj: any,
    args: any,
    ctx: IApolloContext,
    info: any,
  ) => {
    const update: VideoUploadMetadataUpdateDataInput = args.metadata;
    const upload = await ctx.db.query.videoUpload(
      { where: { id: args.id } },
      ' { metadata { id slug }} ',
    );

    // TODO: Handle slug changes with redirect
    if (update.title && !upload.metadata.slug) {
      const doc = nlp(update.title);
      const slug = encodeURIComponent(doc.normalize().out('root').replace(' ', '-').trim());
      update.slug = slug;
    }

    const metadataId = upload.metadata.id;
    return ctx.db.mutation.updateVideoUploadMetadata({
      data: update,
      where: { id: metadataId },
    });
  },
  addNewsSourceItems: async (
    obj: any,
    args: { id: string, newsItemCreateInputs: NewsSourceItemCreateManyInput},
    ctx: IApolloContext,
    info: any,
  ) => {
    const createInputs = args.newsItemCreateInputs;
    const upload = await ctx.db.query.videoUpload(
      { where: { id: args.id } }, '{ id metadata { id newsSources { url source { name avatarPath } } } }');
    const existingLinks = upload.metadata.newsSources;

    // Normalize URLs
    const opts = { removeQueryParameters: [/.+/i], defaultProtocol: 'https:', normalizeProtocol: true };
    if (Array.isArray(createInputs.create)) {
      createInputs.create = createInputs.create.map((input: NewsSourceItemCreateInput) => {
        input.url = normalizeUrl(input.url, opts);
        input.createdBy = { connect: { id: ctx.user.id } };
        return input;
      });

      createInputs.create = createInputs.create.filter((input: NewsSourceItemCreateInput) => {
        return existingLinks.findIndex((existingLink) => {
          return existingLink.url === input.url;
        }) === -1;
      });

      createInputs.create.forEach((input) => {
        logger.info(`Creating news link on ${upload.id} to ${input.url}`);
      });
    } else {
      createInputs.create.url = normalizeUrl(createInputs.create.url, opts);
      createInputs.create.createdBy = { connect: { id: ctx.user.id } };
      const url = createInputs.create.url;
      const exists = existingLinks.findIndex((existingLink) => {
        return existingLink.url === url;
      });
      if (exists !== -1) {
        return upload;
      }
      logger.info(`Creating news link on ${upload.id} to ${url}`);
    }

    const update: VideoUploadMetadataUpdateInput = { newsSources: createInputs };
    const updatedMetadata =
      await ctx.db.mutation.updateVideoUploadMetadata({ where: { id: upload.metadata.id }, data: update }, '{ newsSources { id url } }');
    processNewsItemMetadata(updatedMetadata.newsSources)
      .catch((e: any) => {
        logger.error(`Error setting news item metadata: ${JSON.stringify(e)}`);
      });
    return ctx.db.query.videoUpload({ where: { id: args.id } }, '{ id metadata { newsSources { createdAt url source { name avatarPath } } } }');
  },
  deleteNewsSourceItem: async (
    obj: any,
    args: { id: string},
    ctx: IApolloContext,
    info: any,
  ) => {
    const exists = ctx.db.exists.NewsSourceItem({ id: args.id });
    if (exists) {
      await ctx.db.mutation.deleteNewsSourceItem({ where: { id: args.id } });
      return true;
    }
    return false;
  },
};
