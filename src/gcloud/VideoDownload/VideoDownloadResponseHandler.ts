import prisma from '../../graphql/prismaContext';
import logger from '../../util/logger';
import writeToVideoUploadLog from '../../util/videoUploadLogger';
import { IPubSubConsumerPayload } from '../PubSubHandler';
import { PubSubResponseHandler } from '../PubSubResponseHandler';
import { makeFilePublic } from '../storageController';
import { IVideoDownloadFailedMessage, IVideoDownloadResponseMessage } from './VideoDownloadHandler';
import VideoDownloadPubSubController from './VideoDownloadPubSubController';

export default class VideoDownloadResponseHandler extends PubSubResponseHandler {
  constructor(pubSubController: VideoDownloadPubSubController) {
    super(pubSubController);
  }

  public async responseHandler(message: IPubSubConsumerPayload) {
    const messageData = this.pubSubController.parseMessageData(message);
    if (messageData.error) {
      return this.handleError(messageData, message);
    }

    const response = messageData as IVideoDownloadResponseMessage;
    const id = response.videoUpload.id;

    const existsInThisContext = await prisma.exists.VideoUpload({ id });
    if (!existsInThisContext) {
      return message.nack();
    }

    message.ack();

    await Promise.all(response.storageLinkCreateInputs.map((linkCreateInput) => {
      logger.debug(`Created ${linkCreateInput.version} storage link on ${id}`);
      makeFilePublic(linkCreateInput.bucket, linkCreateInput.path);
      return prisma.mutation.createVideoUploadStorageLink({ data: linkCreateInput });
    }))
      .catch((e) => {
        logger.error(`Error setting storage links on ${id}`, e);
      });
  }

  protected async handleError(messageData: IVideoDownloadFailedMessage, message: IPubSubConsumerPayload) {
    const messageError: IVideoDownloadFailedMessage = messageData;
    const id = messageError.requestPayload.id;
    const exists = await prisma.exists.VideoUpload({ id });
    if (!exists) {
      logger.debug(`Video download error handler nacking because ${id} does not exist in this environment`);
      return message.nack();
    }

    message.ack();
    const upload = await prisma.query.videoUpload({ where: { id } });

    writeToVideoUploadLog(upload, 'FAILED', 'DOWNLOAD', messageError.error);
    logger.error(`Received download handler error response: \n ${JSON.stringify(messageData.error)}`);
  }
}
