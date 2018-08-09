import logger from '../../util/logger';
import PubSubController from '../PubSubController';
import VideoThumbnailHandler from './VideoThumbnailHandler';
import VideoThumbnailResponseHandler from './VideoThumbnailResponseHandler';

export default class VideoThumbnailPubSubController extends PubSubController {
  topicSubcriptionNames = {
    consumerTopicName: 'video-thumbnail',
    consumerSubscriptionName: 'thumbnail',
    responderTopicName: 'video-thumbnail-response',
    responderSubscriptionName: 'thumbnail-response',
  };
  constructor() {
    super();
    this.setup();

    this.consumerHandler = new VideoThumbnailHandler(300000, this);
    this.responseHandler = new VideoThumbnailResponseHandler(this);

    this.addConsumerListener();
    this.addResponseListener();

    logger.debug('Thumbnail PubSub controller activated.');
  }
}
