import { PubSubController } from '@trumpsaid/pubsub';
import VideoRenderResponseHandler from './VideoRenderResponseHandler';

export default class VideoRenderPubSubController extends PubSubController {
  public topicSubcriptionNames = {
    consumerTopicName: 'video-render',
    consumerSubscriptionName: 'render',
    responderTopicName: 'video-render-response',
    responderSubscriptionName: 'render-response',
  };
  constructor() {
    super();
    this.setup();

    this.responseHandler = new VideoRenderResponseHandler(this);

    this.addConsumerListener();
    this.addResponseListener();
  }
}
