import { File } from '@google-cloud/storage';
import { WriteStream } from 'fs';
import youtubedl, { Youtubedl } from 'youtube-dl';
import { VideoUpload, VideoUploadFileLinkType, VideoUploadFileLinkVersion, VideoUploadStorageLinkCreateInput } from '../../graphql/generated/prisma';
import logger from '../../util/logger';
import { IPubSubConsumerFailedResponse } from '../PubSubController';
import { createFileInProcessing, deleteFolderInProcessing, delimiter, processingBucketName } from '../storageController';
import pubSubController, { VIDEO_DOWNLOAD_RESPONSE_TOPIC } from './VideoDownloadPubSubController';

export interface IVideoDownloadResponseMessage {
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

const DOWNLOAD_TIMEOUT = 60 * 1000 * 20;

/**
 * Cloud PubSub video download job handler.
 * @param {*} message - A Base64 encoded VideoUpload object
 */
export const videoDownloadHandler = async (message: any) => {
  message.ack();

  const videoUpload = pubSubController.parseMessageData(message) as VideoUpload;

  const timeout = setTimeout(
    () => {
      const resp: IPubSubConsumerFailedResponse = {
        requestPayload: message,
        error: new Error('Download handler timed out'),
      };

      pubSubController.publishMessage(resp, VIDEO_DOWNLOAD_RESPONSE_TOPIC);
    },
    DOWNLOAD_TIMEOUT);

  // Delete existing download folder
  const storagePrefix = videoUpload.id;
  const path = delimiter + storagePrefix + delimiter;
  await deleteFolderInProcessing(path);

  const desiredVersions: VideoUploadFileLinkType[] = ['FLAC', 'MP4', 'WEBM'];
  const versions: IFileWithType[]  = await Promise.all(desiredVersions.map((version) => {
    return download(videoUpload.submitedUrl, version, path);
  }));

  const filteredVersions: IFileWithType[] = versions.filter((v) => { v !== undefined; });

  const storageLinks: VideoUploadStorageLinkCreateInput[] = filteredVersions.map((fileAndType: IFileWithType) => {
    const file = fileAndType.file;
    const fileType = fileAndType.fileType;
    return {
      fileType,
      path: path + file.name,
      bucket: processingBucketName,
      videoUpload: { connect: { id : videoUpload.id } },
      version: 'MASTER' as VideoUploadFileLinkVersion,
    };
  });

  const response: IVideoDownloadResponseMessage = {
    videoUpload,
    storageLinkCreateInputs: storageLinks,
  };

  pubSubController.publishMessage(response, VIDEO_DOWNLOAD_RESPONSE_TOPIC);
  clearTimeout(timeout);
};

const download = async(url: string, fileType: VideoUploadFileLinkType, path: string) => {
  return new Promise<IFileWithType>((resolve) => {
    logger.debug(`Attempting to download ${url} - ${fileType}`);
    let video: Youtubedl;
    let videoFile: File;
    let videoFileStream: WriteStream;

    switch (fileType) {
      case 'WEBM':
        video = youtubedl(url, ['-f best[ext=webm]'], {});
        break;
      case 'MP4':
        video = youtubedl(url, ['-f best[ext=mp4]'], {});
        break;
      case 'FLAC':
        video = youtubedl(url, ['-f bestaudio', '--extract-audio', '--audio-quality 0'], {});
        break;
      default:
        video = youtubedl(url, [], {});
        break;
    }

    video.on('info', (info) => {
      videoFile = createFileInProcessing(path, info._filename);
      videoFileStream = videoFile.createWriteStream();
      video.pipe(videoFileStream);
      videoFileStream.on('finish', () => {
        videoFile.makePublic().catch((e) => {
          logger.error(`Error making file public: ${JSON.stringify(e)}`);
        });

        logger.info(`Downloaded ${url}, ${fileType} to ${path}/${info._filename} and made public`);

        resolve({ fileType, file: videoFile });
      });

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
};

export default videoDownloadHandler;
