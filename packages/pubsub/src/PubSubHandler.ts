import PubSubController from './PubSubController';
import {
  IPubSubConsumerFailedResponse,
  IPubSubConsumerPayload,
  IPubSubConsumerSuccessMessage,
  IPubSubConsumerUpdateMessage,
} from './PubSubTypes';

export abstract class PubSubHandler {
  public timeout: number;
  public pubSubController: PubSubController;
  public maxJobs: number = 1;
  public activeJobs: number = 0;
  protected constructor(timeout: number, controller: PubSubController) {
    this.timeout = timeout;
    this.pubSubController = controller;
  }
  public abstract requestHandler(
    message: IPubSubConsumerPayload,
  ): Promise<void>;
  protected abstract timedOut(payload: IPubSubConsumerPayload): void;
  protected startTimer(payload: IPubSubConsumerPayload): NodeJS.Timer {
    return setInterval(() => {
      this.timedOut(payload);
    },                 this.timeout);
  }
  protected succeeded(
    response: IPubSubConsumerSuccessMessage,
    timer: NodeJS.Timer,
  ): void {
    clearTimeout(timer);
    if (response) {
      this.pubSubController.publishResponseMessage(response);
    }
    this.activeJobs = this.activeJobs - 1;
  }
  protected update(response: IPubSubConsumerUpdateMessage): void {
    this.pubSubController.publishResponseMessage(response);
  }
  protected failed(
    response: IPubSubConsumerFailedResponse,
    timer?: NodeJS.Timer,
  ): void {
    if (timer) {
      clearTimeout(timer);
    }
    this.pubSubController.publishFailureMessage(response);
    this.activeJobs = this.activeJobs - 1;
  }
}

export default PubSubHandler;
