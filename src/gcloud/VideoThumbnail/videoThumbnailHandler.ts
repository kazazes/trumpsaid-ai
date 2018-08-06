import { File } from '@google-cloud/storage';
import { THUMBNAIL_RESPONSE_TOPIC } from './VideoThumbnailPubSubController';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
import PubSub from '@google-cloud/pubsub';
import fluentFfmpeg from 'fluent-ffmpeg';
import { VideoUpload } from '../../graphql/generated/prisma';
import prisma from '../../graphql/prismaContext';
import logger from '../../util/logger';
import secrets from '../../util/secrets';
import { createFile, delimiter, storage } from '../storageController';

const pubSub = PubSub({
  projectId: secrets.GOOGLE_PROJECT_ID,
  keyFilename: 'gc-credentials.json',
});

export interface IThumbnailRequest {
  upload: VideoUpload;
  timestamp: number;
}

export const renderThumbnail = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    const thumbnailPayload = JSON.parse(
      Buffer.from(event.data, 'base64').toString(),
    ) as IThumbnailRequest;

    const upload = thumbnailPayload.upload;
    const timestamp = thumbnailPayload.timestamp;

    if (!upload) {
      logger.error('Received malformed render thumbnail request. No upload object.');
      return event.ack();
    }

    const videoExistsInThisContext = await prisma.exists.VideoUpload({ id: upload.id });
    if (!videoExistsInThisContext) {
      event.nack();
      resolve();
    } else {
      event.ack();
    }

    prisma.mutation.updateVideoUpload({ where: { id: upload.id }, data: { status: 'GENERATING_THUMBNAILS', state: 'PROCESSING' } });

    // tslint:disable-next-line:no-magic-numbers
    logger.info(`Payload: ${JSON.stringify(thumbnailPayload, null, 2)}`);

    const storageLink = upload.rawStorageLink;

    logger.info(
      `Reading from Storage ${storageLink.bucket +
      delimiter +
      storageLink.path}`,
    );

    const bucket = storage.bucket(storageLink.bucket);
    const sourceFile = bucket.file(storageLink.path);

    const thumbnailFile = bucket.file(
      sourceFile.name.replace(/\.[^/.]+$/, '') + '-thumb.png',
    );

    try {
      await generateThumbnail(thumbnailFile, sourceFile, timestamp);
      const response = {
        requestPayload: thumbnailPayload,
        result:
        {
          path: thumbnailFile.name,
          bucket: bucket.name,
          videoID: upload.id,
        },
      };
      const _ = publishResponse(response);
    } catch (e) {
      const _ = publishResponse({ thumbnailPayload, error: e });
    }
  });
};

const getBuffer = (obj: any) => {
  return Buffer.from(JSON.stringify(obj));
};

const publishResponse = (obj: any) => {
  // tslint:disable-next-line:no-magic-numbers
  logger.info(`Published response: ${JSON.stringify(obj, null, 2)}`);
  return pubSub
    .topic(THUMBNAIL_RESPONSE_TOPIC)
    .publisher()
    .publish(getBuffer(obj))
    .catch((e) => {
      logger.error(`Error publishing response: ${JSON.stringify(e)}`);
    });
};

const generateThumbnail = (thumbnailFile: File, sourceFile: File, timestamp: number) => {
  return new Promise((resolve, reject) => {
    const writeStream = thumbnailFile.createWriteStream({
      contentType: 'image/png',
    });

    const readStream = sourceFile.createReadStream();
    const ffmpeg = fluentFfmpeg();
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg
      .input(readStream)
      .outputOptions(['-f image2', '-vframes 1', '-vcodec png', '-f rawvideo', `-ss ${timestamp}`])
      .on('start', (cmdLine) => {
        logger.debug('Started ffmpeg with command:' + cmdLine);
      })
      .on('end', () => {
        logger.debug('Successfully generated thumbnail.');
        readStream.destroy();
        resolve();
      })
      .on('error', (err, stdout, stderr) => {
        logger.error(`An error occured during encoding ${err.message}\n${stderr}`);
        readStream.destroy();
        reject(err);
      })
      .writeToStream(writeStream, { end: true });
  });
};

export default renderThumbnail;
