// tslint:disable-next-line:variable-name
import PubSub from '@google-cloud/pubsub';
import logger from '../../util/logger';
import PubSubController from '../PubSubController';
import { downloadVideoHandler } from './videoDownloadHandler';

export const VIDEO_DOWNLOAD_TOPIC = 'video-download';
export const VIDEO_RESPONSE_TOPIC = 'video-download-response';

export const VIDEO_DOWNLOAD_SUBSCRIPTION = 'node-downloader';
export const VIDEO_RESPONSE_SUBSCRIPTION = 'node-response';

class VideoDownloadPubSubController extends PubSubController {
  pubsub: PubSub.PubSub;
  downloadTopic: PubSub.Topic;
  responseTopic: PubSub.Topic;
  downloadSubscription: PubSub.Subscription;
  responseSubscription: PubSub.Subscription;
  constructor(downloadHandler: any, responseHandler: any) {
    super();

    this.downloadTopic = this.pubsub.topic(VIDEO_DOWNLOAD_TOPIC);
    this.responseTopic = this.pubsub.topic(VIDEO_RESPONSE_TOPIC);

    this.downloadSubscription = this.downloadTopic.subscription(VIDEO_DOWNLOAD_SUBSCRIPTION);
    this.responseSubscription = this.responseTopic.subscription(VIDEO_RESPONSE_SUBSCRIPTION);

    this.downloadSubscription.on('message', downloadHandler);
    this.responseSubscription.on('message', responseHandler);
  }
}

const controller = new VideoDownloadPubSubController(downloadVideoHandler, (message: any) => {
  message.ack();
  logger.error(JSON.stringify(message));
});
logger.debug('Video download PubSub controller activated.');

export default controller;
