import { PubSubController } from "@trumpsaid/pubsub";
import VideoThumbnailResponseHandler from "./VideoThumbnailResponseHandler";

export default class VideoThumbnailPubSubController extends PubSubController {
  public topicSubcriptionNames = {
    consumerTopicName: "video-thumbnail",
    consumerSubscriptionName: "thumbnail",
    responderTopicName: "video-thumbnail-response",
    responderSubscriptionName: "thumbnail-response"
  };
  constructor() {
    super();
    this.setup();

    this.responseHandler = new VideoThumbnailResponseHandler(this);

    this.addResponseListener();
  }
}
