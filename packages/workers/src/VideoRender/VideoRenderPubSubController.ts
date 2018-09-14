import { PubSubController } from '@trumpsaid/pubsub';
import VideoRenderHandler from './VideoRenderHandler';

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

    this.consumerHandler = new VideoRenderHandler(7200000, this);

    this.addConsumerListener();
  }
}
