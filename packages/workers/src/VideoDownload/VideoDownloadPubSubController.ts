import { PubSubController } from '@trumpsaid/pubsub';
import VideoDownloadHandler from './VideoDownloadHandler';

export default class VideoDownloadPubSubController extends PubSubController {
  public topicSubcriptionNames = {
    consumerTopicName: 'video-download',
    consumerSubscriptionName: 'node-downloader',
    responderTopicName: 'video-download-response',
    responderSubscriptionName: 'node-response',
  };
  constructor() {
    super();
    this.setup();

    this.consumerHandler = new VideoDownloadHandler(1200000, this);

    this.addConsumerListener();
  }
}
