import PubSubController from "./PubSubController";
import {
  IPubSubConsumerFailedResponse,
  IPubSubConsumerPayload
} from "./PubSubTypes";

export default abstract class PubSubResponseHandler {
  public pubSubController: PubSubController;
  public maxJobs: number = 1;
  public activeJobs: number = 0;
  protected constructor(pubSubController: PubSubController) {
    this.pubSubController = pubSubController;
  }

  public abstract responseHandler(
    message: IPubSubConsumerPayload
  ): Promise<any>;
  protected abstract handleError(
    messageData: IPubSubConsumerFailedResponse,
    message: IPubSubConsumerPayload
  ): Promise<any>;
}
