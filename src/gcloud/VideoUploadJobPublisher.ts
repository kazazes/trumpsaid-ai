import moment from 'moment';
import { VideoUpload } from '../graphql/generated/prisma';
import prisma from '../graphql/prismaContext';
import writeToVideoUploadLog from '../util/videoUploadLogger';
import VideoDownloadPubSubController from './VideoDownload/VideoDownloadPubSubController';
import VideoRenderPubSubController from './VideoRender/VideoRenderPubSubController';
import { IThumbnailRequest } from './VideoThumbnail/VideoThumbnailHandler';
import VideoThumbnailPubSubController from './VideoThumbnail/VideoThumbnailPubSubController';

const downloadController = new VideoDownloadPubSubController();
const renderController = new VideoRenderPubSubController();
const thumbnailController = new VideoThumbnailPubSubController();

export const publishDownloadJob = async(upload: VideoUpload) => {
  writeToVideoUploadLog(upload, 'STARTED', 'DOWNLOAD', undefined, moment().add(20, 'minutes'));
  const populatedUpload = await prisma.query.videoUpload({ where: { id: upload.id } }, ' { id submitedUrl }');
  downloadController.publishConsumerMessage(populatedUpload);
};

export const publishRenderJob = async(upload: VideoUpload) => {
  writeToVideoUploadLog(upload, 'STARTED', 'ENCODE', undefined, moment().add(2, 'hours'));
  const populatedUpload = await
  prisma.query.videoUpload(
    { where: { id: upload.id } },
    '{ id storageLinks{ id videoUpload { id metadata { renderStart renderEnd } } path bucket version fileType } }');
  renderController.publishConsumerMessage(populatedUpload);
};

export const publishThumbnailJob = (upload: VideoUpload, timestamp: number) => {
  writeToVideoUploadLog(upload, 'STARTED', 'THUMBNAIL', JSON.stringify({ timestamp }), moment().add(5, 'minutes'));
  const request: IThumbnailRequest = { upload, timestamp };
  thumbnailController.publishConsumerMessage(request);
};
