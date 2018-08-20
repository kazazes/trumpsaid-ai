import VideoDownloadPubSubController from './gcloud/VideoDownload/VideoDownloadPubSubController';
import VideoRenderPubSubController from './gcloud/VideoRender/VideoRenderPubSubController';
import VideoThumbnailPubSubController from './gcloud/VideoThumbnail/VideoThumbnailPubSubController';

new VideoDownloadPubSubController();
new VideoRenderPubSubController();
new VideoThumbnailPubSubController();
