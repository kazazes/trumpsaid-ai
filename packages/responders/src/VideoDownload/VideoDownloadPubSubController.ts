import { PubSubController } from "@trumpsaid/pubsub";
import VideoDownloadResponseHandler from "./VideoDownloadResponseHandler";

class VideoDownloadPubSubController extends PubSubController {
  public topicSubcriptionNames = {
    consumerSubscriptionName: "node-downloader",
    consumerTopicName: "video-download",
    responderSubscriptionName: "node-response",
    responderTopicName: "video-download-response"
  };
  constructor() {
    super();
    this.setup();

    this.responseHandler = new VideoDownloadResponseHandler(this);

    this.addResponseListener();
  }
}

export default VideoDownloadPubSubController;
