import { File } from '@google-cloud/storage';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
import fluentFfmpeg, { FfmpegCommand } from 'fluent-ffmpeg';
import fs from 'fs';
import moment, { Moment } from 'moment';
import { VideoUpload, VideoUploadFileLinkType, VideoUploadStorageLink, VideoUploadStorageLinkCreateInput } from '../../graphql/generated/prisma';
import logger from '../../util/logger';
import { IPubSubConsumerFailedResponse, IPubSubConsumerPayload, IPubSubConsumerSuccessMessage, PubSubHandler } from '../PubSubHandler';
import { createFileInProcessing, directoryFromPath, downloadStorageItem,
  filenameWithoutPathOrExtension, processingBucketName } from '../storageController';
import VideoRenderPubSubController from './VideoRenderPubSubController';

interface IFfmpegStage {
  ffmpeg: FfmpegCommand;
  renderOutput: File;
  masterLocalPath: string;
  start: Moment;
  path: string;
  inputFormat: string;
}

// We can't itterate type definitions, which is all Prisma gives us, so define manually here
// Thumbnail intentionally excluded, as it's a seperate handler
enum VideoUploadFileLinkTypeEnum {
  WEBM,
  MP4,
  AUDIO,
}

export interface IVideoRenderSuccessMessage extends IPubSubConsumerSuccessMessage {
  videoUpload: VideoUpload;
  storageLinkCreateInputs: VideoUploadStorageLinkCreateInput[];
}

export interface IVideoRenderFailedMessage extends IPubSubConsumerFailedResponse {
  requestPayload: VideoUpload;
}

export default class VideoRenderHandler extends PubSubHandler {
  constructor(timeout: number, controller: VideoRenderPubSubController) {
    super(timeout, controller);
  }
  public async requestHandler(message: IPubSubConsumerPayload) {
    const timer = this.startTimer(message);
    return new Promise<void>(async (resolve, reject) => {
      const videoUpload = this.pubSubController.parseMessageData(message) as VideoUpload;

      message.ack();

      logger.debug(`Handling render for ${videoUpload.id}`);

      const storageLinks = videoUpload.storageLinks;

      const hasAMaster = storageLinks.find((link) => {
        return link.version === 'MASTER' && (link.fileType === 'MP4' || link.fileType === 'WEBM');
      });

      if (!hasAMaster) {
        const err = 'Renderer was given a job which has no video masters. Aborting.';
        logger.error(err);
        const resp: IVideoRenderFailedMessage = {
          requestPayload: videoUpload,
          error: err,
        };
        this.failed(resp, timer);
        return reject();
      }

      const encodeFormats: VideoUploadFileLinkType[] = [];
      const transcodeFormats: VideoUploadFileLinkType[] = [];

      // VideoUploadFileLinkTypeEnum contains VideoUploadFileLinkTypes less Thumbnail
      Object.keys(VideoUploadFileLinkTypeEnum).map((fileLinkType) => {
        const hasMaster = storageLinks.find((link) => {
          return link.fileType === fileLinkType && link.version === 'MASTER';
        });
        const hasWeb = storageLinks.find((link) => {
          return link.fileType === fileLinkType && link.version === 'WEB';
        });
        if (hasMaster && !hasWeb) {
          encodeFormats.push(fileLinkType as VideoUploadFileLinkType);
        } else if (!hasMaster && !hasWeb) {
          transcodeFormats.push(fileLinkType as VideoUploadFileLinkType);
        }
      });

      logger.debug(`Rendering with ${encodeFormats.length} encode and ${transcodeFormats.length} transcode jobs.`);
      logger.debug(`Encode: ${encodeFormats.join(', ')}`);
      logger.debug(`Transcode to: ${transcodeFormats.join(', ')}`);

      const renderResults: VideoUploadStorageLinkCreateInput[] = [];

      for (const format of transcodeFormats) {
        try {
          const storageCreateInput = await this.transcode(format, storageLinks);
          renderResults.push(storageCreateInput);
        } catch (e) {
          logger.error('Rendering error occured! See above.');
          logger.error(JSON.stringify(e));
        }
      }

      for (const format of encodeFormats) {
        try {
          const storageCreateInput = await this.encode(format, storageLinks);
          renderResults.push(storageCreateInput);
        } catch (e) {
          logger.error('Rendering error occured! See above.');
          logger.error(JSON.stringify(e));
        }
      }

      const response: IVideoRenderSuccessMessage = {
        videoUpload,
        storageLinkCreateInputs: renderResults,
      };

      this.succeeded(response, timer);
      resolve();
    });
  }
  protected timedOut(payload: IPubSubConsumerPayload): void {
    const resp: IPubSubConsumerFailedResponse = {
      requestPayload: payload,
      error: new Error('Render handler timed out'),
    };
    this.failed(resp);
  }
  private async encode(format: VideoUploadFileLinkType, storageLinks: VideoUploadStorageLink[])
  : Promise<VideoUploadStorageLinkCreateInput> {
    const master = storageLinks.find((link) => { return link.version === 'MASTER' && link.fileType === format; });
    switch (format) {
      case 'MP4':
        return this.encodeMP4(master);
      case 'WEBM':
        return this.encodeWebM(master);
      case 'AUDIO':
        return this.encodeAudio(master);
      default:
        logger.error(`${format} does not match any known encode types.`);
        throw new Error(`${format} does not match any known encode types.`);
    }
  }
  private async transcode(format: VideoUploadFileLinkType, storageLinks: VideoUploadStorageLink[]): Promise<VideoUploadStorageLinkCreateInput> {
    let master;
    switch (format) {
      case 'MP4':
        master = storageLinks.find(link => link.version === 'MASTER' && link.fileType === 'WEBM');
      case 'WEBM':
        master = storageLinks.find(link => link.version === 'MASTER' && link.fileType === 'MP4');
      case 'AUDIO':
        master = storageLinks.find(link => link.version === 'MASTER' && (link.fileType === 'MP4' || link.fileType === 'WEBM'));
      default:
        logger.error(`${format} does not match any known transcode types.`);
        throw new Error(`${format} does not match any known transcode types.`);
    }

    if (!master) {
      logger.error(`No master found for transcode to ${format}! Aborting.`);
      throw new Error(`No master found for transcode to ${format}! Aborting.`);
    }

    switch (format) {
      case 'MP4':
        return this.transcodeToMP4(master);
      case 'WEBM':
        return this.transcodeToWebM(master);
      case 'AUDIO':
        return this.transcodeToAudio(master);
      default:
        logger.error(`${format} does not match any known transcode types.`);
        throw new Error(`${format} does not match any known transcode types.`);
    }
  }
  private async stageRender(master: VideoUploadStorageLink): Promise<IFfmpegStage> {
    const masterLocalPath = await downloadStorageItem(master);
    const path = `${directoryFromPath(master.path)}${filenameWithoutPathOrExtension(master.path)}-web.mp4`;
    const renderOutput = createFileInProcessing(directoryFromPath(master.path), filenameWithoutPathOrExtension(master.path) + '-web.mp4');
    const ffmpeg = fluentFfmpeg({ logger });
    const inputFormat = filenameWithoutPathOrExtension(master.path).split('.').pop();
    ffmpeg.setFfmpegPath(ffmpegPath);
    return { path, ffmpeg, masterLocalPath, renderOutput, inputFormat, start: moment() };
  }
  private async encodeMP4(master: VideoUploadStorageLink): Promise<VideoUploadStorageLinkCreateInput> {
    const stage = await this.stageRender(master);
    const { ffmpeg, renderOutput, masterLocalPath, path, start, inputFormat } = stage;
    const writeStream = renderOutput.createWriteStream({ contentType: 'video/mp4' });
    await new Promise<File>((resolve, reject) => {
      ffmpeg
        .input(masterLocalPath)
        .inputFormat(inputFormat)
        .format('mp4')
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions('-vprofile high')
        .outputOptions('-crf 24')
        .outputOptions('-movflags faststart')
        .outputOptions('-preset slow')
        .outputOptions('-map_metadata -1')
        .on('start', (cmdLine) => {
          logger.debug('Started ffmpeg with command: ' + cmdLine);
        })
        .on('end', () => {
          logger.debug(`Successfully encoded video as MP4 ${start.toNow()}`);
          resolve(renderOutput);
        })
        .on('error', (err, stdout, stderr) => {
          logger.error('An error occured during encoding: ', JSON.stringify(err));
          logger.error(stdout);
          logger.error(stderr);
          reject(err);
        })
        .pipe(writeStream, { end: true });
    })
    .catch((e) => {
      logger.error(JSON.stringify(e));
      throw e;
    });

    return {
      path,
      bucket: processingBucketName,
      version: 'WEB',
      fileType: 'MP4',
      videoUpload: { connect: { id: master.videoUpload.id } },
    };
  }
  private async encodeWebM(master: VideoUploadStorageLink): Promise<VideoUploadStorageLinkCreateInput> {
    const stage = await this.stageRender(master);
    const { ffmpeg, renderOutput, masterLocalPath, path, start, inputFormat } = stage;
    const writeStream = renderOutput.createWriteStream({ contentType: 'video/webm' });
    await new Promise<File>((resolve, reject) => {
      ffmpeg
        .input(masterLocalPath)
        .inputFormat(inputFormat)
        .format('webm')
        .videoCodec('libvpx')
        .audioCodec('libvorbis')
        .videoBitrate('1000')
        .videoFilter('scale=1280:-2')
        .outputOptions('-qmin 0')
        .outputOptions('-qmax 25')
        .outputOptions('-map_metadata -1')
        .on('start', (cmdLine) => {
          logger.debug('Started ffmpeg with command: ' + cmdLine);
        })
        .on('end', () => {
          logger.debug(`Successfully encoded video as Webm ${start.toNow()}`);
          resolve(renderOutput);
        })
        .on('error', (err, stdout, stderr) => {
          logger.error('An error occured during encoding: ', JSON.stringify(err));
          logger.error(stdout);
          logger.error(stderr);
          reject(err);
        })
        .pipe(writeStream, { end: true });
    })
      .catch((e) => {
        logger.error(JSON.stringify(e));
        throw e;
      });

    return {
      path,
      bucket: processingBucketName,
      version: 'WEB',
      fileType: 'WEBM',
      videoUpload: { connect: { id: master.videoUpload.id } },
    };
  }
  private async encodeAudio(master: VideoUploadStorageLink): Promise<VideoUploadStorageLinkCreateInput> {
    const stage = await this.stageRender(master);
    const { ffmpeg, renderOutput, masterLocalPath, path, start, inputFormat } = stage;
    const flacOutputPath = `/tmp/ts-wtf/${filenameWithoutPathOrExtension(master.path)}.flac`;
    await new Promise<string>((resolve, reject) => {
      ffmpeg
        .input(masterLocalPath)
        .inputFormat(inputFormat)
        .noVideo()
        .format('flac')
        .audioChannels(1)
        .output(flacOutputPath)
        .on('start', (cmdLine) => {
          logger.debug('Started ffmpeg with command: ' + cmdLine);
        })
        .on('end', () => {
          logger.debug(`Successfully encoded audio as flac ${start.toNow()}`);
          resolve(masterLocalPath);
        })
        .on('error', (err, stdout, stderr) => {
          logger.error('An error occured during encoding: ', JSON.stringify(err));
          logger.error(stdout);
          logger.error(stderr);
          reject(err);
        })
        .run();
    })
      .catch((e) => {
        logger.error(JSON.stringify(e));
        throw e;
      });

    const writeStream = renderOutput.createWriteStream({ contentType: 'audio/flac' });
    const flacFileLocal = fs.createReadStream(masterLocalPath);
    flacFileLocal.pipe(writeStream);

    return {
      path,
      bucket: processingBucketName,
      version: 'WEB',
      fileType: 'AUDIO',
      videoUpload: { connect: { id: master.videoUpload.id } },
    };
  }
  private async transcodeToMP4(master: VideoUploadStorageLink): Promise<VideoUploadStorageLinkCreateInput> {
    return this.encodeMP4(master);
  }
  private async transcodeToWebM(master: VideoUploadStorageLink): Promise<VideoUploadStorageLinkCreateInput> {
    return this.encodeWebM(master);
  }
  private async transcodeToAudio(master: VideoUploadStorageLink): Promise<VideoUploadStorageLinkCreateInput> {
    return this.encodeAudio(master);
  }
}
