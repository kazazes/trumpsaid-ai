// tslint:disable-next-line:variable-name
import PubSub, { Subscription, Topic } from '@google-cloud/pubsub';
import logger from '../util/logger';
import secrets from '../util/secrets';
import { PubSubHandler } from './PubSubHandler';
import { PubSubResponseHandler } from './PubSubResponseHandler';

export interface ITopicSubscriptionNames {
  consumerTopicName: string;
  consumerSubscriptionName: string;
  responderTopicName: string;
  responderSubscriptionName: string;
}

abstract class PubSubController {
  pubsub: PubSub.PubSub;
  consumerTopic: Topic;
  consumerSubscription: Subscription;
  responderTopic: Topic;
  responderSubscription: Subscription;
  topicSubcriptionNames: ITopicSubscriptionNames;
  consumerHandler: PubSubHandler;
  responseHandler: PubSubResponseHandler;
  constructor() {
    this.pubsub = PubSub({
      projectId: secrets.GOOGLE_PROJECT_ID,
      keyFilename: 'gc-credentials.json',
    });

    this.consumerTopic = this.pubsub.topic(this.topicSubcriptionNames.consumerTopicName);
    this.consumerSubscription = this.pubsub.subscription(this.topicSubcriptionNames.consumerSubscriptionName);
    this.responderTopic = this.pubsub.topic(this.topicSubcriptionNames.responderTopicName);
    this.responderSubscription = this.pubsub.subscription(this.topicSubcriptionNames.responderSubscriptionName);
  }
  protected addConsumerListener() {
    this.consumerSubscription.on('message', this.consumerHandler.requestHandler);
  }
  protected addResponseListener() {
    this.responderSubscription.on('message', this.responseHandler.responseHandler);
  }

  public publishConsumerMessage = (obj: any) => {
    logger.info(`Published to ${this.consumerTopic}: ${JSON.stringify(obj, null, 2)}`);
    this.consumerTopic
      .publisher()
      .publish(this.getBuffer(obj))
      .catch((err) => {
        logger.error(
          `Error publishing to topic ${this.consumerTopic}]\n ${JSON.stringify(err)}`,
        );
      });
  }

  public publishResponseMessage = (obj: any) => {
    logger.info(`Published to ${this.responderTopic}: ${JSON.stringify(obj, null, 2)}`);
    this.responderTopic
      .publisher()
      .publish(this.getBuffer(obj))
      .catch((err) => {
        logger.error(
          `Error publishing to topic ${this.responderTopic}]\n ${JSON.stringify(err)}`,
        );
      });
  }

  public getBuffer = (obj: any) => {
    return Buffer.from(JSON.stringify(obj));
  }

  public parseMessageData(message: any) {
    return JSON.parse(this.getBuffer(message.data).toString());
  }
}

export default PubSubController;
