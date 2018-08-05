// tslint:disable-next-line:variable-name
import PubSub from '@google-cloud/pubsub';
import { VideoStorageLink, VideoUpload } from '../graphql/generated/prisma';
import prisma from '../graphql/prismaContext';
import logger from '../util/logger';
import PubSubController from './PubSubController';
import videoRenderHandler from './videoRenderHandler';

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

interface IRenderResponsePayload {
  requestPayload: VideoUpload;
  error: any;
  result: [VideoStorageLink];
}

export const controller = new VideoRenderPubSubController(videoRenderHandler, async (message: any) => {
  const renderResponsePayload = JSON.parse(
    Buffer.from(message.data, 'base64').toString(),
  ) as IRenderResponsePayload;

  const existsInThisContext = await prisma.exists.VideoUpload({ id: renderResponsePayload.requestPayload.id });
  if (!existsInThisContext) {
    return message.nack();
  }

  if (renderResponsePayload.error) {
    message.ack();
    logger.error('Render response error: ' + JSON.stringify(renderResponsePayload.error));
    return;
  }

  await Promise.all(renderResponsePayload.result.map(async(link) => {
    const createdLink = await prisma.mutation.createVideoStorageLink({ data: link });
    if (link.version === 'WEBM') {
      return prisma.mutation.updateVideoUpload({ where: { id: link.videoID }, data: { webmLink: { connect: { id: createdLink.id } } } });
    }

    if (link.version === 'MP4') {
      return prisma.mutation.updateVideoUpload({ where: { id: link.videoID }, data: { mp4Link: { connect: { id: createdLink.id } } } });
    }

    logger.error(`Received invalid render response result version type ${link.version}\n\n${link}`);
  }));

  await prisma.mutation.updateVideoUpload(
    { where: { id: renderResponsePayload.requestPayload.id }, data: { state: 'PENDING', status: 'NEEDS_THUMBNAILS' } });

  message.ack();

  // tslint:disable-next-line:no-magic-numbers
  logger.info('RENDER RESPONSE ' + JSON.stringify(renderResponsePayload, null, 2));
});

export default controller;
