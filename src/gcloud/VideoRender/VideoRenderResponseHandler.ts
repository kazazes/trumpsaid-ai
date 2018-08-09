import { VideoUploadStorageLinkCreateInput } from '../../graphql/generated/prisma';
import prisma from '../../graphql/prismaContext';
import logger from '../../util/logger';
import writeToVideoUploadLog from '../../util/videoUploadLogger';
import { IPubSubConsumerPayload } from '../PubSubHandler';
import { PubSubResponseHandler } from '../PubSubResponseHandler';
import { makeFilePublic } from '../storageController';
import { IVideoRenderFailedMessage, IVideoRenderSuccessMessage } from './VideoRenderHandler';
import VideoRenderPubSubController from './VideoRenderPubSubController';

export default class VideoRenderResponseHandler extends PubSubResponseHandler {
  constructor(pubSubController: VideoRenderPubSubController) {
    super(pubSubController);
  }
  public async responseHandler(message: IPubSubConsumerPayload) {
    const messageData = this.pubSubController.parseMessageData(message);
    if (messageData.error) {
      return this.handleError(messageData, message);
    }

    const response = messageData as IVideoRenderSuccessMessage;
    const id = response.videoUpload.id;

    const existsInThisContext = await prisma.exists.VideoUpload({ id });
    if (!existsInThisContext) {
      return message.nack();
    }

    message.ack();

    const deleted = await this.deleteExistingDuplicateLinkTypes(response.storageLinkCreateInputs, id);
    if (Number(deleted.count) > 0) {
      logger.debug(`Deleted ${deleted.count} existing encodes before creating new ones.`);
    }

    await Promise.all(response.storageLinkCreateInputs.map((linkCreateInput) => {
      logger.debug(`Created ${linkCreateInput.version}/${linkCreateInput.fileType} storage link on ${id}`);
      makeFilePublic(linkCreateInput.bucket, linkCreateInput.path);
      return prisma.mutation.createVideoUploadStorageLink({ data: linkCreateInput });
    }))
      .catch((e) => {
        logger.error(`Error setting storage links on ${id}`, e);
      });
  }

  private async deleteExistingDuplicateLinkTypes(storageLinkCreateInputs: VideoUploadStorageLinkCreateInput[], id: string) {
    const { storageLinks } = await prisma.query.videoUpload({ where: { id } }, ' { storageLinks { id path version bucket fileType } }');
    const toDelete = storageLinks.filter((existingLink) => {
      return storageLinkCreateInputs.find((newLink) => {
        if (newLink.version === existingLink.version && newLink.fileType === existingLink.fileType) {
          return true;
        }

        return false;
      });
    }).map(link => link.fileType);

    return prisma.mutation.deleteManyVideoUploadStorageLinks({ where: { id_in: toDelete } });
  }
  protected async handleError(messageData: IVideoRenderFailedMessage, message: IPubSubConsumerPayload) {
    const messageError: IVideoRenderFailedMessage = messageData;
    const id = messageError.requestPayload.id;
    const exists = await prisma.exists.VideoUpload({ id });
    if (!exists) {
      logger.debug(`Video render error handler nacking because ${id} does not exist in this environment`);
      return message.nack();
    }

    message.ack();
    const upload = await prisma.query.videoUpload({ where: { id } });

    writeToVideoUploadLog(upload, 'FAILED', 'ENCODE', messageError.error);
    logger.error(`Received render handler error response: \n ${JSON.stringify(messageData.error)}`);
  }
}
