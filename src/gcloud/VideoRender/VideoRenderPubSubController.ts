import logger from '../../util/logger';
import PubSubController from '../PubSubController';
import VideoRenderHandler from './VideoRenderHandler';
import VideoRenderResponseHandler from './VideoRenderResponseHandler';

export default class VideoRenderPubSubController extends PubSubController {
  topicSubcriptionNames = {
    consumerTopicName: 'video-render',
    consumerSubscriptionName: 'render',
    responderTopicName: 'video-render-response',
    responderSubscriptionName: 'render-response-subscription',
  };
  constructor() {
    super();

    this.consumerHandler = new VideoRenderHandler(7200000, this);
    this.responseHandler = new VideoRenderResponseHandler(this);

    this.addConsumerListener();
    this.addResponseListener();

    logger.debug('Render PubSub controller activated.');
  }
}
