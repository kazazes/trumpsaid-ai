import PubSubController from './PubSubController';

export abstract class PubSubHandler {
  timeout: number;
  pubSubController: PubSubController;
  constructor(timeout: number, controller: PubSubController) {
    this.timeout = timeout;
    this.pubSubController = controller;
  }
  protected abstract timedOut(payload: IPubSubConsumerPayload): void;
  protected startTimer(payload: IPubSubConsumerPayload): NodeJS.Timer {
    return setInterval(() => { this.timedOut(payload); }, this.timeout);
  }
  public abstract requestHandler(message: IPubSubConsumerPayload): Promise<void>;
  protected succeeded(response: IPubSubConsumerSuccessMessage, timer: NodeJS.Timer): void {
    clearTimeout(timer);
    if (response) {
      this.pubSubController.publishResponseMessage(response);
    }
  }
  protected update(response: IPubSubConsumerUpdateMessage): void {
    this.pubSubController.publishResponseMessage(response);
  }
  protected failed(response: IPubSubConsumerFailedResponse, timer?: NodeJS.Timer): void {
    if (timer) {
      clearTimeout(timer);
    }
    this.pubSubController.publishFailureMessage(response);
  }
}

export interface IPubSubConsumerFailedResponse {
  requestPayload: any;
  error: any;
}

export interface IPubSubConsumerSuccessMessage {

}

export interface IPubSubConsumerUpdateMessage {

}

export interface IPubSubConsumerPayload {
  ack?(): void;
  nack?(): void;
}

export default PubSubHandler;
