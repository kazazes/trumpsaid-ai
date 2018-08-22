import { logger, writeVideoUploadLog } from '@trumpsaid/common';
import prismaContext from '@trumpsaid/prisma/dist/prismaContext';
import sleep from 'await-sleep';
import { IPubSubConsumerPayload } from '../PubSubHandler';
import { PubSubResponseHandler } from '../PubSubResponseHandler';
import { makeFilePublic } from '../storageController';
import { IThumbnailFailedMessage, IThumbnailResponseMessage } from './VideoThumbnailHandler';
import VideoThumbnailPubSubController from './VideoThumbnailPubSubController';

export default class VideoThumbnailResponseHandler extends PubSubResponseHandler {
  constructor(pubSubController: VideoThumbnailPubSubController) {
    super(pubSubController);
  }
  public async responseHandler(message: IPubSubConsumerPayload) {
    const messageData = this.pubSubController.parseMessageData(message);
    if (messageData.error) {
      return this.handleError(messageData, message);
    }

    const response = messageData as IThumbnailResponseMessage;
    const id = response.videoUpload.id;

    const existsInThisContext = await prismaContext.exists.VideoUpload({ id });
    if (!existsInThisContext) {
      return message.nack();
    }

    message.ack();

    await prismaContext.mutation.deleteManyVideoUploadStorageLinks({ where: { videoUpload: { id }, fileType: 'THUMBNAIL' } });

    await Promise.all(response.storageLinkCreateInputs.map(async (linkCreateInput) => {
      logger.debug(`Created ${linkCreateInput.version}/${linkCreateInput.fileType} storage link on ${id}`);
      await sleep(3000);
      makeFilePublic(linkCreateInput.bucket, linkCreateInput.path);
      return prismaContext.mutation.createVideoUploadStorageLink({ data: linkCreateInput });
    }))
      .catch((e) => {
        logger.error(`Error setting storage links on ${id}`, e);
      });
  }

  protected async handleError(messageData: IThumbnailFailedMessage, message: IPubSubConsumerPayload) {
    const messageError: IThumbnailFailedMessage = messageData;
    const id = messageError.requestPayload.id;
    const exists = await prismaContext.exists.VideoUpload({ id });
    if (!exists) {
      logger.debug(`Thumbnail error handler nacking because ${id} does not exist in this environment`);
      return message.nack();
    }

    message.ack();

    const upload = await prismaContext.query.videoUpload({ where: { id } });

    writeVideoUploadLog(upload, 'FAILED', 'THUMBNAIL', messageError.error);
    logger.error(`Received thumbnail handler error response: \n ${JSON.stringify(messageData.error)}`);
  }
}
