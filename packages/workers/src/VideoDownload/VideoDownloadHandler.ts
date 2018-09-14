import { File } from '@google-cloud/storage';
import {
  createFileInProcessing,
  deleteFolderInProcessing,
  delimiter,
  logger,
} from '@trumpsaid/common';
import {
  IPubSubConsumerFailedResponse,
  IPubSubConsumerPayload,
  IVideoDownloadResponseMessage,
  PubSubHandler,
} from '@trumpsaid/pubsub';
import { WriteStream } from 'fs';
import youtubedl, { Youtubedl } from 'youtube-dl';
import VideoDownloadPubSubController from './VideoDownloadPubSubController';

import {
  VideoUpload,
  VideoUploadFileLinkType,
  VideoUploadFileLinkVersion,
  VideoUploadStorageLinkCreateInput,
} from '@trumpsaid/prisma';

interface IFileWithType {
  file: File;
  fileType: VideoUploadFileLinkType;
  mimeType: string;
}

export default class VideoDownloadHandler extends PubSubHandler {
  constructor(timeout: number, controller: VideoDownloadPubSubController) {
    super(timeout, controller);
  }
  public async requestHandler(message: IPubSubConsumerPayload) {
    if (this.activeJobs >= this.maxJobs) {
      return message.nack();
    }
    this.activeJobs = this.activeJobs + 1;
    const timer = this.startTimer(message);
    message.ack();

    const videoUpload = this.pubSubController.parseMessageData(
      message,
    ) as VideoUpload;

    // Delete existing download folder
    const storagePrefix = videoUpload.id;
    const path = storagePrefix + delimiter;
    await deleteFolderInProcessing(path);

    const desiredVersions: VideoUploadFileLinkType[] = ['AUDIO', 'MP4', 'WEBM'];
    const versions: IFileWithType[] = await Promise.all(
      desiredVersions.map((version) => {
        return this.download(videoUpload.submitedUrl, version, path);
      }),
    );

    const filteredVersions: IFileWithType[] = versions.filter((v) => {
      return v !== undefined;
    });

    const storageLinks: VideoUploadStorageLinkCreateInput[] = filteredVersions.map(
      (fileAndType: IFileWithType) => {
        const { file, fileType, mimeType } = fileAndType;
        if (mimeType === undefined) {
          throw new Error('MIME type undefined');
        }
        return {
          fileType,
          mimeType,
          path: file.name,
          bucket: process.env.VIDEO_PROCESSING_BUCKET,
          videoUpload: { connect: { id: videoUpload.id } },
          version: 'MASTER' as VideoUploadFileLinkVersion,
        };
      },
    );

    const response: IVideoDownloadResponseMessage = {
      videoUpload,
      storageLinkCreateInputs: storageLinks,
    };

    this.succeeded(response, timer);
  }
  protected timedOut(payload: IPubSubConsumerPayload): void {
    const resp: IPubSubConsumerFailedResponse = {
      requestPayload: payload,
      error: new Error('Download handler timed out'),
    };
    this.failed(resp);
  }

  private download(
    url: string,
    fileType: VideoUploadFileLinkType,
    path: string,
  ) {
    return new Promise<IFileWithType>((resolve) => {
      logger.info(`Attempting to download ${url} - ${fileType}`);
      let video: Youtubedl;
      let videoFile: File;
      let videoFileStream: WriteStream;
      let mimeType: string;

      switch (fileType) {
        case 'WEBM':
          video = youtubedl(url, ['-f best[ext=webm]'], {});
          mimeType = 'video/webm';
          break;
        case 'MP4':
          video = youtubedl(url, ['-f best[ext=mp4]'], {});
          mimeType = 'video/mp4';
          break;
        case 'AUDIO':
          video = youtubedl(
            url,
            ['-f bestaudio', '--extract-audio', '--audio-quality 0'],
            {},
          );
          break;
        default:
          video = youtubedl(url, [], {});
          break;
      }
      video.on('info', (info) => {
        try {
          videoFile = createFileInProcessing(path, info._filename);
          videoFileStream = videoFile.createWriteStream({
            contentType: mimeType,
          });
          video.pipe(videoFileStream);
          videoFileStream.on('finish', () => {
            videoFile.makePublic().catch((e) => {
              logger.error(`Error making file public: ${JSON.stringify(e)}`);
            });

            logger.info(
              `Downloaded ${url}, ${fileType} to ${path}/${
                info._filename
              } and made public`,
            );

            resolve({ mimeType, fileType, file: videoFile });
          });
        } catch (e) {
          logger.error('Download error', e);
          throw e;
        }
        logger.info(`Download started for
      \tVideo: ${url}
      \tType: ${fileType}
      \tSize: ${info.size}
      \tTitle: ${info._filename}`);
      });

      video.on('error', (err) => {
        logger.error(
          `Failed to download ${url}, ${fileType}: \n ${JSON.stringify(err)}`,
        );
        resolve();
      });
    });
  }
}
