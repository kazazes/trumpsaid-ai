import { File } from '@google-cloud/storage';
import { THUMBNAIL_RESPONSE_TOPIC } from './VideoThumbnailPubSubController';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
import PubSub from '@google-cloud/pubsub';
import fluentFfmpeg from 'fluent-ffmpeg';
import sharp from 'sharp';
import { Duplex } from 'stream';
import { VideoUpload } from '../../graphql/generated/prisma';
import logger from '../../util/logger';
import secrets from '../../util/secrets';
import { delimiter, storage } from '../storageController';

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

    event.ack();

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

    const thumbnailFileRaw = bucket.file(
      sourceFile.name.replace(/\.[^/.]+$/, '') + '-thumb-raw.png',
    );

    const thumbnailFileWeb = bucket.file(
      sourceFile.name.replace(/\.[^/.]+$/, '') + '-thumb.jpg',
    );

    try {
      await generateThumbnail(thumbnailFileRaw, sourceFile, timestamp);
      await compressThumbnail(thumbnailFileRaw, thumbnailFileWeb);
      const response = {
        requestPayload: thumbnailPayload,
        result:
        {
          path: thumbnailFileWeb.name,
          bucket: bucket.name,
          videoID: upload.id,
        },
      };
      publishResponse(response).catch((e) => {
        logger.error(`Error publishing response: ${JSON.stringify(e)}`);
      });
    } catch (e) {
      publishResponse({ thumbnailPayload, error: e })
        .catch((e) => {
          logger.error(`Error publishing response: ${JSON.stringify(e)}`);
        });
    }
  });
};

const compressThumbnail = async (inputFile: File, outputFile: File) => {
  return new Promise(async (resolve, reject) => {
    const fileBuffers = await inputFile.download();
    const rawBuffer = fileBuffers[0];

    const compressed = await sharp(rawBuffer).jpeg({ progressive: true }).toBuffer();
    const outputStream = outputFile.createWriteStream({
      contentType: 'image/jpeg',
    });

    const readStream = new Duplex();
    readStream.on('end', resolve);
    readStream.on('error', reject);
    readStream.push(compressed);
    readStream.push(null);
    readStream.pipe(outputStream);
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
    const remoteWriteStream = thumbnailFile.createWriteStream({
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
      .writeToStream(remoteWriteStream, { end: true });
  });
};

export default renderThumbnail;