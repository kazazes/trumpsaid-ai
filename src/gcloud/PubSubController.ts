// tslint:disable-next-line:variable-name
import PubSub, { Subscription, Topic } from '@google-cloud/pubsub';
import logger from '../util/logger';
import secrets from '../util/secrets';

export interface IPubSubConsumerFailedResponse {
  requestPayload: any;
  error: any;
}

abstract class PubSubController {
  pubsub: PubSub.PubSub;
  consumerTopic: Topic;
  consumerSubscription: Subscription;
  responderTopic: Topic;
  responderSubscription: Subscription;
  constructor(consumerTopicName: string, consumerSubscriptionName: string, responderTopicName: string, responderSubscriptionName: string) {
    this.pubsub = PubSub({
      projectId: secrets.GOOGLE_PROJECT_ID,
      keyFilename: 'gc-credentials.json',
    });
    this.consumerTopic = this.pubsub.topic(consumerTopicName);
    this.consumerSubscription = this.pubsub.subscription(consumerSubscriptionName);
    this.responderTopic = this.pubsub.topic(responderTopicName);
    this.responderSubscription = this.pubsub.subscription(responderSubscriptionName);
  }

  public publishMessage = (obj: any, topic: string) => {
    logger.info(`Published to ${topic}: ${JSON.stringify(obj, null, 2)}`);
    this.pubsub
      .topic(topic)
      .publisher()
      .publish(this.getBuffer(obj))
      .catch((err) => {
        logger.error(
          `Error publishing to topic ${topic}]\n ${JSON.stringify(err)}`,
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
