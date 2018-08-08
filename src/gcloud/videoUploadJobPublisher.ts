import moment from 'moment';
import { VideoUpload } from '../graphql/generated/prisma';
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

export const publishRenderJob = (upload: VideoUpload) => {
  writeToVideoUploadLog(upload, 'STARTED', 'ENCODE', undefined, moment().add(2, 'hours'));
  renderController.publishConsumerMessage(upload);
};

export const publishThumbnailJob = (upload: VideoUpload, timestamp: Number) => {
  writeToVideoUploadLog(upload, 'STARTED', 'THUMBNAIL', JSON.stringify({ timestamp }), moment().add(5, 'minutes'));
  const request = { upload, timestamp };
  thumbnailController.publishConsumerMessage(request);
};
