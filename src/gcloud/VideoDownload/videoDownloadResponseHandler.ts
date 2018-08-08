import prisma from '../../graphql/prismaContext';
import logger from '../../util/logger';
import writeToVideoUploadLog from '../../util/videoUploadLogger';
import { IVideoDownloadFailedMessage, IVideoDownloadResponseMessage } from './videoDownloadHandler';
import pubSubController from './VideoDownloadPubSubController';

export const videoDownloadResponseHandler = async(message: any) => {
  const messageData = pubSubController.parseMessageData(message);
  if (messageData.error) {
    return handleError(messageData, message);
  }

  message.ack();

  const response = messageData as IVideoDownloadResponseMessage;
  const id = response.videoUpload.id;
  await Promise.all(response.storageLinkCreateInputs.map((linkCreateInput) => {
    logger.debug(`Created ${linkCreateInput.version} storage link on ${id}`);
    return prisma.mutation.createVideoUploadStorageLink({ data: linkCreateInput });
  }))
  .catch((e) => {
    logger.error(`Error setting storage links on ${id}`, e);
  });
};

const handleError = async(messageData: IVideoDownloadFailedMessage, message: any) => {
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
};

export default videoDownloadResponseHandler;
