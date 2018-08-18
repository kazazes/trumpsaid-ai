import { File } from '@google-cloud/storage';
import { WriteStream } from 'fs';
import youtubedl, { Youtubedl } from 'youtube-dl';
import { VideoUpload, VideoUploadFileLinkType, VideoUploadFileLinkVersion, VideoUploadStorageLinkCreateInput } from '../../graphql/generated/prisma';
import logger from '../../util/logger';
import PubSubHandler, { IPubSubConsumerFailedResponse, IPubSubConsumerPayload, IPubSubConsumerSuccessMessage } from '../PubSubHandler';
import { createFileInProcessing, deleteFolderInProcessing, delimiter, processingBucketName } from '../storageController';
import VideoDownloadPubSubController from './VideoDownloadPubSubController';

export interface IVideoDownloadResponseMessage extends IPubSubConsumerSuccessMessage {
  videoUpload: VideoUpload;
  storageLinkCreateInputs: VideoUploadStorageLinkCreateInput[];
}

export interface IVideoDownloadFailedMessage extends IPubSubConsumerFailedResponse {
  requestPayload: VideoUpload;
}

interface IFileWithType {
  file: File;
  fileType: VideoUploadFileLinkType;
}

class VideoDownloadHandler extends PubSubHandler {
  constructor(timeout: number, controller: VideoDownloadPubSubController) {
    super(timeout, controller);
  }
  protected timedOut(payload: IPubSubConsumerPayload): void {
    const resp: IPubSubConsumerFailedResponse = {
      requestPayload: payload,
      error: new Error('Download handler timed out'),
    };
    this.failed(resp);
  }
  public async requestHandler(message: IPubSubConsumerPayload) {
    const timer = this.startTimer(message);

    message.ack();

    const videoUpload = this.pubSubController.parseMessageData(message) as VideoUpload;

    // Delete existing download folder
    const storagePrefix = videoUpload.id;
    const path = storagePrefix + delimiter;
    await deleteFolderInProcessing(path);

    const desiredVersions: VideoUploadFileLinkType[] = ['AUDIO', 'MP4', 'WEBM'];
    const versions: IFileWithType[] = await Promise.all(desiredVersions.map((version) => {
      return this.download(videoUpload.submitedUrl, version, path);
    }));

    const filteredVersions: IFileWithType[] = versions.filter((v) => { return v !== undefined; });

    const storageLinks: VideoUploadStorageLinkCreateInput[] = filteredVersions.map((fileAndType: IFileWithType) => {
      const file = fileAndType.file;
      const fileType = fileAndType.fileType;
      return {
        fileType,
        path: file.name,
        bucket: processingBucketName,
        videoUpload: { connect: { id: videoUpload.id } },
        version: 'MASTER' as VideoUploadFileLinkVersion,
      };
    });

    const response: IVideoDownloadResponseMessage = {
      videoUpload,
      storageLinkCreateInputs: storageLinks,
    };

    this.succeeded(response, timer);
  }

  private download(url: string, fileType: VideoUploadFileLinkType, path: string) {
    return new Promise<IFileWithType>((resolve) => {
      logger.debug(`Attempting to download ${url} - ${fileType}`);
      let video: Youtubedl;
      let videoFile: File;
      let videoFileStream: WriteStream;
      let contentType: string;

      switch (fileType) {
        case 'WEBM':
          video = youtubedl(url, ['-f best[ext=webm]'], {});
          contentType = 'video/webm';
          break;
        case 'MP4':
          video = youtubedl(url, ['-f best[ext=mp4]'], {});
          contentType = 'video/mp4';
          break;
        case 'AUDIO':
          video = youtubedl(url, ['-f bestaudio', '--extract-audio', '--audio-quality 0'], {});
          break;
        default:
          video = youtubedl(url, [], {});
          break;
      }
      video.on('info', (info) => {
        try {
          videoFile = createFileInProcessing(path, info._filename);
          videoFileStream = videoFile.createWriteStream({ contentType });
          video.pipe(videoFileStream);
          videoFileStream.on('finish', () => {
            videoFile.makePublic().catch((e) => {
              logger.error(`Error making file public: ${JSON.stringify(e)}`);
            });

            logger.info(`Downloaded ${url}, ${fileType} to ${path}/${info._filename} and made public`);

            resolve({ fileType, file: videoFile });
          });
        } catch(e) {
          logger.error('Download error', e);
        }
        logger.debug(`Download started for
      \tVideo: ${url}
      \tType: ${fileType}
      \tSize: ${info.size}
      \tTitle: ${info._filename}`);
      });

      video.on('error', (err) => {
        logger.error(`Failed to download ${url}, ${fileType}: \n ${JSON.stringify(err)}`);
        resolve();
      });
    });
  }
}

export default VideoDownloadHandler;
