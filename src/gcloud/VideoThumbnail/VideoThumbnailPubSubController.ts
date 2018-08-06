// tslint:disable-next-line:variable-name
import PubSub from '@google-cloud/pubsub';
import logger from '../../util/logger';
import PubSubController from '../PubSubController';
import videoThumbnailHandler from './videoThumbnailHandler';
import videoThumbnailResponseHandler from './videoThumbnailResponseHandler';

export const THUMBNAIL_TOPIC = 'video-thumbnail';
export const THUMBNAIL_RESPONSE_TOPIC = 'video-thumbnail-response';
export const THUMBNAIL_RESPONSE_SUBSCRIPTION = 'thumbnail-response';
export const THUMBNAIL_SUBSCRIPTION = 'thumbnail';

class VideoThumbnailPubSubController extends PubSubController {
  pubsub: PubSub.PubSub;
  thumbnailTopic: PubSub.Topic;
  thumbnailResponseTopic: PubSub.Topic;
  thumbnailResponseSubscription: PubSub.Subscription;
  thumbnailSubscription: PubSub.Subscription;

  constructor(requestHandler: any, responseHandler: any) {
    super();

    // thumbnail pubsub
    this.thumbnailTopic = this.pubsub.topic(THUMBNAIL_TOPIC);
    this.thumbnailResponseTopic = this.pubsub.topic(THUMBNAIL_RESPONSE_TOPIC);

    this.thumbnailSubscription = this.thumbnailTopic.subscription(THUMBNAIL_SUBSCRIPTION);
    this.thumbnailResponseSubscription = this.thumbnailResponseTopic.subscription(THUMBNAIL_RESPONSE_SUBSCRIPTION);

    this.thumbnailSubscription.on('message', requestHandler);
    this.thumbnailResponseSubscription.on('message', responseHandler);

    logger.debug('Thumbnail PubSub controller activated.');
  }
}

export const controller = new VideoThumbnailPubSubController(videoThumbnailHandler, videoThumbnailResponseHandler);

export default controller;
