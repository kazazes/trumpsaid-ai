// tslint:disable-next-line:variable-name
import PubSub from '@google-cloud/pubsub';
import logger from '../util/logger';
import secrets from '../util/secrets';
import { downloadVideoHandler } from './videoDownloadHandler';

export const VIDEO_DOWNLOAD_TOPIC = 'video-download';
export const VIDEO_RESPONSE_TOPIC = 'video-download-response';

export const VIDEO_DOWNLOAD_SUBSCRIPTION = 'node-downloader';
export const VIDEO_RESPONSE_SUBSCRIPTION = 'node-response';

class VideoDownloadPubSubController {
  pubsub: PubSub.PubSub;
  downloadTopic: PubSub.Topic;
  responseTopic: PubSub.Topic;
  downloadSubscription: PubSub.Subscription;
  responseSubscription: PubSub.Subscription;
  constructor(downloadHandler: any, responseHandler: any) {
    this.pubsub = PubSub({
      projectId: secrets.GOOGLE_PROJECT_ID,
      keyFilename: 'gc-credentials.json',
    });

    this.downloadTopic = this.pubsub.topic(VIDEO_DOWNLOAD_TOPIC);
    this.responseTopic = this.pubsub.topic(VIDEO_RESPONSE_TOPIC);

    this.downloadSubscription = this.downloadTopic.subscription(VIDEO_DOWNLOAD_SUBSCRIPTION);
    this.responseSubscription = this.responseTopic.subscription(VIDEO_RESPONSE_SUBSCRIPTION);

    this.downloadSubscription.on('message', downloadHandler);
    this.responseSubscription.on('message', responseHandler);
  }
}

const controller = new VideoDownloadPubSubController(downloadVideoHandler, (message: any) => { logger.error(message); });
logger.debug('PubSub controller activated.');

export default controller;
