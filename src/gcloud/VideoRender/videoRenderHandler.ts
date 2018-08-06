import { File } from '@google-cloud/storage';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
import PubSub from '@google-cloud/pubsub';
import fluentFfmpeg from 'fluent-ffmpeg';
import { VideoUpload } from '../../graphql/generated/prisma';
import prisma from '../../graphql/prismaContext';
import logger from '../../util/logger';
import secrets from '../../util/secrets';
import { delimiter, storage } from '../storageController';
import { RENDER_RESPONSE_TOPIC } from './VideoRenderPubSubController';

const pubSub = PubSub({
  projectId: secrets.GOOGLE_PROJECT_ID,
  keyFilename: 'gc-credentials.json',
});

export const renderVideo = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    const renderPayload = JSON.parse(
      Buffer.from(event.data, 'base64').toString(),
    ) as VideoUpload;

    const videoExistsInThisContext = await prisma.exists.VideoUpload({ id: renderPayload.id });
    if (!videoExistsInThisContext) {
      event.nack();
      resolve();
    } else {
      event.ack();
    }

    // tslint:disable-next-line:no-magic-numbers
    logger.info(`Payload: ${JSON.stringify(renderPayload, null, 2)}`);

    const storageLink = renderPayload.rawStorageLink;

    logger.info(
      `Reading from Storage ${storageLink.bucket +
      delimiter +
      storageLink.path}`,
    );

    const bucket = storage.bucket(storageLink.bucket);
    const sourceFile = bucket.file(storageLink.path);

    const mp4File = bucket.file(
      sourceFile.name.replace(/\.[^/.]+$/, '') + '-web.mp4',
    );
    const webmFile = bucket.file(
      sourceFile.name.replace(/\.[^/.]+$/, '') + '-web.webm',
    );

    try {
      await mp4Conversion(mp4File, sourceFile);
      await webmConversion(webmFile, sourceFile);
      const _ = publishResponse({
        requestPayload: renderPayload,
        error: undefined,
        result: [
          {
            path: webmFile.name,
            bucket: bucket.name,
            version: 'WEBM',
            videoID: renderPayload.id,
          },
          {
            path: mp4File.name,
            bucket: bucket.name,
            version: 'MP4',
            videoID: renderPayload.id,
          },
        ],
      });
    } catch (e) {
      const _ = publishResponse({ renderPayload, error: e });
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
    .topic(RENDER_RESPONSE_TOPIC)
    .publisher()
    .publish(getBuffer(obj))
    .catch((e) => {
      logger.error(`Error publishing response: ${JSON.stringify(e)}`);
    });
};

const mp4Conversion = (mp4File: File, sourceFile: File) => {
  return new Promise((resolve, reject) => {
    const writeStream = mp4File.createWriteStream({
      contentType: 'video/mp4',
    });
    const readStream = sourceFile.createReadStream();
    const ffmpeg = fluentFfmpeg();
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg
      .input(readStream)
      .inputFormat(sourceFile.name.split('.').pop() as string)
      .format('mp4')
      .videoCodec('libx264')
      .audioCodec('aac')
      .videoFilter('scale=1280:-2')
      .outputOptions('-crf 22')
      .outputOptions('-movflags faststart+frag_keyframe')
      .outputOptions('-preset slow')
      .on('start', (cmdLine) => {
        logger.debug('Started ffmpeg with command:' + cmdLine);
      })
      .on('end', () => {
        logger.debug('Successfully re-encoded video as mp4.');
        readStream.destroy();
        resolve();
      })
      .on('error', (err, stdout, stderr) => {
        logger.error('An error occured during encoding', err.message);
        readStream.destroy();
        reject(err);
      })
      .writeToStream(writeStream, { end: true });
  });
};

const webmConversion = (webmFile: File, sourceFile: File) => {
  return new Promise((resolve, reject) => {
    const writeStream = webmFile.createWriteStream({
      contentType: 'video/webm',
    });
    const readStream = sourceFile.createReadStream();
    const ffmpeg = fluentFfmpeg();
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg
      .input(readStream)
      .inputFormat(sourceFile.name.split('.').pop() as string)
      .format('webm')
      .videoCodec('libvpx')
      .audioCodec('libvorbis')
      .videoBitrate('1000')
      .videoFilter('scale=1280:-2')
      .outputOptions('-qmin 0')
      .outputOptions('-qmax 25')
      .on('start', (cmdLine) => {
        logger.info('Started ffmpeg with command:' + cmdLine);
      })
      .on('end', () => {
        logger.info('Successfully re-encoded video to webm.');
        readStream.destroy();
        resolve();
      })
      .on('error', (err, stdout, stderr) => {
        logger.error('An error occured during encoding', err.message);
        readStream.destroy();
        reject(err);
      })
      .writeToStream(writeStream, { end: true });
  });
};

export default renderVideo;
