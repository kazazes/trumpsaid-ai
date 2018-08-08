import moment from 'moment';
import { VideoUpload } from '../graphql/generated/prisma';
import writeToVideoUploadLog from '../util/videoUploadLogger';
import downloadController, { VIDEO_DOWNLOAD_TOPIC } from './VideoDownload/VideoDownloadPubSubController';
import renderController, { RENDER_TOPIC } from './VideoRender/VideoRenderPubSubController';
import thumbnailController, { THUMBNAIL_TOPIC } from './VideoThumbnail/VideoThumbnailPubSubController';

export const publishDownloadJob = async (upload: VideoUpload) => {
  writeToVideoUploadLog(upload, 'STARTED', 'DOWNLOAD', undefined, moment().add(20, 'minutes'));
  downloadController.publishMessage(upload, VIDEO_DOWNLOAD_TOPIC);
};

export const publishRenderJob = async (upload: VideoUpload) => {
  writeToVideoUploadLog(upload, 'STARTED', 'TRANSCODE', undefined, moment().add(1, 'hour'));
  renderController.publishMessage(upload, RENDER_TOPIC);
};

export const publishThumbnailJob = async (upload: VideoUpload, timestamp: Number) => {
  writeToVideoUploadLog(upload, 'STARTED', 'THUMBNAIL_SELECT', JSON.stringify({ timestamp }), moment().add(5, 'minutes'));
  const request = { upload, timestamp };
  thumbnailController.publishMessage(request, THUMBNAIL_TOPIC);
};
