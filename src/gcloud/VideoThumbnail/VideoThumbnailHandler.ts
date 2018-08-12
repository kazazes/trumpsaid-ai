const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
import sleep from 'await-sleep';
import fluentFfmpeg from 'fluent-ffmpeg';
import sharp from 'sharp';
import { Duplex } from 'stream';
import { VideoUpload, VideoUploadStorageLink, VideoUploadStorageLinkCreateInput } from '../../graphql/generated/prisma';
import logger from '../../util/logger';
import { IPubSubConsumerFailedResponse, IPubSubConsumerPayload, IPubSubConsumerSuccessMessage, PubSubHandler } from '../PubSubHandler';
import { createFileInProcessing, directoryFromPath, downloadStorageItem, filenameWithoutPathOrExtension, getReadStream } from '../storageController';
import VideoThumbnailPubSubController from './VideoThumbnailPubSubController';

export interface IThumbnailRequest extends IPubSubConsumerPayload {
  upload: VideoUpload;
  timestamp: number;
}

export interface IThumbnailResponseMessage extends IPubSubConsumerSuccessMessage {
  videoUpload: VideoUpload;
  storageLinkCreateInputs: VideoUploadStorageLinkCreateInput[];
}

export interface IThumbnailFailedMessage extends IPubSubConsumerFailedResponse {
  requestPayload: VideoUpload;
  timestamp: number;
}

export default class VideoThumbnailHandler extends PubSubHandler {
  constructor(timeout: number, controller: VideoThumbnailPubSubController) {
    super(timeout, controller);
  }
  protected timedOut(payload: IPubSubConsumerPayload): void {
    const resp: IPubSubConsumerFailedResponse = {
      requestPayload: payload,
      error: new Error('Thumbbnail handler timed out'),
    };
    this.failed(resp);
  }
  public async requestHandler(message: IPubSubConsumerPayload) {
    const timer = this.startTimer(message);

    message.ack();

    const { upload, timestamp } = this.pubSubController.parseMessageData(message) as IThumbnailRequest;

    const masterLink = upload.storageLinks.find(v => v.version === 'MASTER' && (v.fileType === 'MP4' || v.fileType === 'WEBM'));

    try {
      const masterThumbnailCreateInput = await this.generateThumbnail(masterLink, timestamp);
      await sleep(1500);
      const compressedThumbnailCreateInput = await this.compressThumbnail(masterThumbnailCreateInput);
      const response: IThumbnailResponseMessage = {
        videoUpload: upload,
        storageLinkCreateInputs: [masterThumbnailCreateInput, compressedThumbnailCreateInput],
      };

      this.succeeded(response, timer);
    } catch (e) {
      const resp: IThumbnailFailedMessage = {
        timestamp,
        error: e,
        requestPayload: upload,
      };

      this.failed(resp, timer);
    }
  }
  private async generateThumbnail(masterLink: VideoUploadStorageLink, timestamp: number) {
    const rawThumbnailPath = `${directoryFromPath(masterLink.path)}${filenameWithoutPathOrExtension(masterLink.path)}.png`;
    const rawThumbnailFile = createFileInProcessing(directoryFromPath(masterLink.path), `${filenameWithoutPathOrExtension(masterLink.path)}.png`);
    await new Promise<void>((resolve, reject) => {
      const writeStream = rawThumbnailFile.createWriteStream({
        contentType: 'image/png',
      });

      const sourceReadStream = getReadStream(masterLink);

      const ffmpeg = fluentFfmpeg();
      ffmpeg.setFfmpegPath(ffmpegPath);
      ffmpeg
        .input(sourceReadStream)
        .outputOptions(['-f image2', '-vframes 1', '-vcodec png', '-f rawvideo', `-ss ${timestamp}`])
        .on('start', (cmdLine) => {
          logger.debug('Started ffmpeg with command:' + cmdLine);
        })
        .on('end', () => {
          logger.debug('Successfully generated thumbnail.');
          sourceReadStream.destroy();
          resolve();
        })
        .on('error', (err, stdout, stderr) => {
          logger.error(`An error occured during encoding ${err.message}\n${stderr}`);
          sourceReadStream.destroy();
          reject(err);
        })
        .pipe(writeStream, { end: true });
    });

    const rawThumbnailStorageLink: VideoUploadStorageLinkCreateInput = {
      path: rawThumbnailPath,
      bucket: masterLink.bucket,
      version: 'MASTER',
      fileType: 'THUMBNAIL',
      videoUpload: { connect: { id: masterLink.videoUpload.id } },
    };

    return rawThumbnailStorageLink;
  }
  private async compressThumbnail(rawThumbnail: VideoUploadStorageLinkCreateInput) {
    return new Promise<VideoUploadStorageLinkCreateInput>(async (resolve, reject) => {
      const localThumb = await downloadStorageItem(rawThumbnail);
      const compressedThumbnailPath = `${directoryFromPath(rawThumbnail.path)}${filenameWithoutPathOrExtension(rawThumbnail.path)}.jpg`;
      const compressedThumbnailFile = createFileInProcessing(
        directoryFromPath(rawThumbnail.path), `${filenameWithoutPathOrExtension(rawThumbnail.path)}.jpg`);

      const compressed = await sharp(localThumb).jpeg({ progressive: true }).toBuffer();
      const outputStream = compressedThumbnailFile.createWriteStream({
        contentType: 'image/jpeg',
      });

      const createInput: VideoUploadStorageLinkCreateInput = {
        path: compressedThumbnailPath,
        bucket: rawThumbnail.bucket,
        version: 'WEB',
        fileType: 'THUMBNAIL',
        videoUpload: { connect: { id: rawThumbnail.videoUpload.connect.id } },
      };

      const readStream = new Duplex();
      readStream.on('end', () => { resolve(createInput); });
      readStream.on('error', (e) => { reject(e); });
      readStream.push(compressed);
      readStream.push(null);
      readStream.pipe(outputStream);
    });
  }
}
