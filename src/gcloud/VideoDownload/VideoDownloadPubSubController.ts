import PubSubController from '../PubSubController';
import VideoDownloadHandler from './videoDownloadHandler';
import VideoDownloadResponseHandler from './videoDownloadResponseHandler';

export class VideoDownloadPubSubController extends PubSubController {
  topicSubcriptionNames = {
    consumerTopicName: 'video-download',
    consumerSubscriptionName: 'node-downloader',
    responderTopicName: 'video-download-response',
    responderSubscriptionName: 'node-response',
  };
  constructor(){
    super();
    this.setup();

    this.consumerHandler = new VideoDownloadHandler(1200000, this);
    this.responseHandler = new VideoDownloadResponseHandler(this);

    this.addConsumerListener();
    this.addResponseListener();
  }
}

export default VideoDownloadPubSubController;
