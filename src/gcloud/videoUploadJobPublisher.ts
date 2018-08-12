import moment from 'moment';
import { VideoUpload } from '../graphql/generated/prisma';
import prisma from '../graphql/prismaContext';
import writeToVideoUploadLog from '../util/videoUploadLogger';
import VideoDownloadPubSubController from './VideoDownload/VideoDownloadPubSubController';
import VideoRenderPubSubController from './VideoRender/VideoRenderPubSubController';
import VideoThumbnailPubSubController from './VideoThumbnail/VideoThumbnailPubSubController';

const downloadController = new VideoDownloadPubSubController();
const renderController = new VideoRenderPubSubController();
const thumbnailController = new VideoThumbnailPubSubController();

export const publishDownloadJob = (upload: VideoUpload) => {
  writeToVideoUploadLog(upload, 'STARTED', 'DOWNLOAD', undefined, moment().add(20, 'minutes'));
  downloadController.publishConsumerMessage(upload);
};

export const publishRenderJob = async(upload: VideoUpload) => {
  writeToVideoUploadLog(upload, 'STARTED', 'ENCODE', undefined, moment().add(2, 'hours'));
  const populatedUpload = await
  prisma.query.videoUpload(
    { where: { id: upload.id } },
    '{ id storageLinks{ id videoUpload { id metadata { renderStart renderEnd } } path bucket version fileType } }');
  renderController.publishConsumerMessage(populatedUpload);
};

export const publishThumbnailJob = (upload: VideoUpload, timestamp: Number) => {
  writeToVideoUploadLog(upload, 'STARTED', 'THUMBNAIL', JSON.stringify({ timestamp }), moment().add(5, 'minutes'));
  const request = { upload, timestamp };
  thumbnailController.publishConsumerMessage(request);
};
