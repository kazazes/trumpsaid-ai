// tslint:disable-next-line:variable-name
import PubSub from '@google-cloud/pubsub';
import logger from '../../util/logger';
import PubSubController from '../PubSubController';
import videoRenderHandler from './videoRenderHandler';
import videoRenderResponseHandler from './videoRenderResponseHandler';

export const RENDER_TOPIC = 'video-render';
export const RENDER_RESPONSE_TOPIC = 'video-render-response';
export const RENDER_RESPONSE_SUBSCRIPTION = 'render-response';
export const RENDER_SUBSCRIPTION = 'render';

class VideoRenderPubSubController extends PubSubController {
  pubsub: PubSub.PubSub;
  renderTopic: PubSub.Topic;
  renderResponseTopic: PubSub.Topic;
  renderResponseSubscription: PubSub.Subscription;
  renderSubscription: PubSub.Subscription;

  constructor(requestHandler: any, responseHandler: any) {
    super();

    // Render pubsub
    this.renderTopic = this.pubsub.topic(RENDER_TOPIC);
    this.renderResponseTopic = this.pubsub.topic(RENDER_RESPONSE_TOPIC);

    this.renderSubscription = this.renderTopic.subscription(RENDER_SUBSCRIPTION);
    this.renderResponseSubscription = this.renderResponseTopic.subscription(RENDER_RESPONSE_SUBSCRIPTION);

    this.renderSubscription.on('message', requestHandler);
    this.renderResponseSubscription.on('message', responseHandler);

    logger.debug('Render PubSub controller activated.');
  }
}

export const controller = new VideoRenderPubSubController(videoRenderHandler, videoRenderResponseHandler);

export default controller;
