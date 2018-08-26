import { logger, writeVideoUploadLog } from '@trumpsaid/common';
import { VideoUploadStorageLinkCreateInput } from '@trumpsaid/prisma';
import prismaContext from '@trumpsaid/prisma/dist/prismaContext';
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

    const existsInThisContext = await prismaContext.exists.VideoUpload({ id });
    if (!existsInThisContext) {
      return message.nack();
    }

    message.ack();

    try {
      const deleted = await this.deleteExistingVideoSources(id);
      if (Number(deleted.count) > 0) {
        logger.debug(`Deleted ${deleted.count} linked video sources before setting new ones.`);
      }
    } catch (e) {
      logger.error(`Failed to delete existing video upload storage links on ${id}.`, e);
    }

    await Promise.all(response.storageLinkCreateInputs.map((linkCreateInput: VideoUploadStorageLinkCreateInput) => {
      logger.debug(`Created ${linkCreateInput.version} storage link on ${id}`);
      makeFilePublic(linkCreateInput.bucket, linkCreateInput.path);
      return prismaContext.mutation.createVideoUploadStorageLink({ data: linkCreateInput });
    }))
      .catch((e) => {
        logger.error(`Error setting storage links on ${id}: ${JSON.stringify(e, null, 2)}`);
      });
  }

  private deleteExistingVideoSources(videoUploadId: string) {
    return prismaContext.mutation.deleteManyVideoUploadStorageLinks({ where: { videoUpload: { id: videoUploadId } } });
  }

  protected async handleError(messageData: IVideoDownloadFailedMessage, message: IPubSubConsumerPayload) {
    const messageError: IVideoDownloadFailedMessage = messageData;
    const id = messageError.requestPayload.id;
    const exists = await prismaContext.exists.VideoUpload({ id });
    if (!exists) {
      logger.debug(`Video download error handler nacking because ${id} does not exist in this environment`);
      return message.nack();
    }

    message.ack();
    const upload = await prismaContext.query.videoUpload({ where: { id } });

    writeVideoUploadLog(upload, 'FAILED', 'DOWNLOAD', messageError.error);
    logger.error(`Received download handler error response: \n ${JSON.stringify(messageData.error)}`);
  }
}
