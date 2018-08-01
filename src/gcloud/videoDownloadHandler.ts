import stringToStream from 'string-to-stream';
import youtubedl from 'youtube-dl';
import { VideoUpload } from '../graphql/generated/prisma';
import prisma from '../graphql/prismaContext';
import logger from '../util/logger';
import { createFileInProcessing, deleteFolderInProcessing, delimiter, processingBucket } from './storageController';
import pubSubController from './VideoDownloadPubSubController';
export const downloadVideoHandler = async (message: any) => {
  const start = new Date().getMilliseconds();
  const videoUploadPayload = JSON.parse(
    Buffer.from(message.data, 'base64').toString(),
  ) as VideoUpload;
  logger.info(`Payload:
    ${JSON.stringify(videoUploadPayload)}
  `);

  const exists = await prisma.exists.VideoUpload({ id: videoUploadPayload.id })
    .catch((e) => {
      return message.nack();
    });
  if (!exists) {
    logger.debug('Passing on video job, cannot find original');
    return message.nack();
  }

  logger.debug(`Attempting to download ${videoUploadPayload.submitedUrl}`);
  message.ack();

  prisma.mutation.updateVideoUpload({ where: { id: videoUploadPayload.id }, data: { state: 'PROCESSING', status: 'DOWNLOADING' } })
    .catch((err) => {
      logger.error(err);
      throw err;
    });

  const storagePrefix = videoUploadPayload.id;
  const path = delimiter + storagePrefix + delimiter;

  const video = youtubedl(videoUploadPayload.submitedUrl, [], {});
  await deleteFolderInProcessing(path);

  let meta: any;

  video.on('info', (info) => {
    meta = info;
    try {
      const videoFile = createFileInProcessing(path, info._filename);
      const metaFile = createFileInProcessing(path, 'info.json');

      const metaFileStream = metaFile.createWriteStream({ contentType: 'application/json' });
      const videoFileStream = videoFile.createWriteStream();

      // tslint:disable-next-line:no-magic-numbers
      stringToStream(JSON.stringify(info, null, 2)).pipe(metaFileStream);
      video.pipe(videoFileStream);
    } catch (e) {
      logger.error('Error uploading file: ' + JSON.stringify(e));
    }

    logger.debug(`Download started for
      \tVideo: ${videoUploadPayload.submitedUrl}
      \tSize: ${info.size}
      \tTitle: ${info._filename}`);
  });

  video.on('end', async () => {
    // tslint:disable-next-line:no-magic-numbers
    const duration = (new Date().getMilliseconds() - start) / 10;
    const fullPath = `${videoUploadPayload.id}/${ meta._filename }`;
    logger.info(`Downloaded upload ${meta._filename} to ${processingBucket.name}/${fullPath} in ${duration} seconds`);

    const storageLink = await prisma.mutation.createVideoStorageLink(
      { data: { path: fullPath, videoID: videoUploadPayload.id, bucket: processingBucket.name, version: 'RAW' } }, ' { id }');
    return prisma.mutation.updateVideoUpload({
      where: { id: videoUploadPayload.id },
      data: {
        rawStorageLink: { connect: storageLink },
        state: 'PROCESSING',
        status: 'GENERATING_THUMBNAILS',
      },
    });
  });

  video.on('error', (err) => {
    prisma.mutation.updateVideoUpload({ where: { id: videoUploadPayload.id }, data: { state: 'FAILED', status: 'DOWNLOADING' } })
      .catch((err) => {
        logger.error(err);
        throw err;
      });

    const message = { err, trigger: videoUploadPayload };
    const dataBuffer = Buffer.from(JSON.stringify(message));
    pubSubController
      .responseTopic
      .publisher()
      .publish(dataBuffer)
      .then((messageId) => {
        logger.error(
          `Failed to download, published err to ${pubSubController.responseTopic} as ${messageId}`,
        );
        logger.error(err);
      })
      .catch((err) => {
        logger.error(err);
        throw err;
      });
  });
};
