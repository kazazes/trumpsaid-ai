import { PubSubController } from "@trumpsaid/pubsub";
import VideoThumbnailHandler from "./VideoThumbnailHandler";

export default class VideoThumbnailPubSubController extends PubSubController {
  public topicSubcriptionNames = {
    consumerSubscriptionName: "thumbnail",
    consumerTopicName: "video-thumbnail",
    responderSubscriptionName: "thumbnail-response",
    responderTopicName: "video-thumbnail-response"
  };
  constructor() {
    super();
    this.setup();

    this.consumerHandler = new VideoThumbnailHandler(300000, this);

    this.addConsumerListener();
  }
}
