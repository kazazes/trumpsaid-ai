// tslint:disable-next-line:variable-name
import PubSub from '@google-cloud/pubsub';
import logger from '../../util/logger';
import PubSubController from '../PubSubController';
import videoDownloadHandler from './videoDownloadHandler';
import videoDownloadResponseHandler from './videoDownloadResponseHandler';

export const VIDEO_DOWNLOAD_TOPIC = 'video-download';
export const VIDEO_DOWNLOAD_RESPONSE_TOPIC = 'video-download-response';

export const VIDEO_DOWNLOAD_SUBSCRIPTION = 'video-download-subscription';
export const VIDEO_DOWNLOAD_RESPONSE_SUBSCRIPTION =
  'video-download-response-subscription';

class VideoDownloadPubSubController extends PubSubController {
  pubsub: PubSub.PubSub;
  constructor(downloadHandler: any, responseHandler: any) {
    super(VIDEO_DOWNLOAD_TOPIC, VIDEO_DOWNLOAD_SUBSCRIPTION, VIDEO_DOWNLOAD_RESPONSE_TOPIC, VIDEO_DOWNLOAD_RESPONSE_SUBSCRIPTION);

    this.consumerSubscription.on('message', downloadHandler);
    this.responderSubscription.on('message', responseHandler);
  }
}

const controller = new VideoDownloadPubSubController(videoDownloadHandler, videoDownloadResponseHandler);

logger.debug('Video download PubSub controller activated.');

export default controller;
