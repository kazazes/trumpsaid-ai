import { VideoUpload } from '../graphql/generated/prisma';
import logger from '../util/logger';
import pubSubController from './VideoDownloadPubSubController';

export const publishDownloadJob = async(upload: VideoUpload) => {
  const dataBuffer = Buffer.from(JSON.stringify(upload));
  try {
    const messageId = await pubSubController.downloadTopic.publisher().publish(dataBuffer);
    logger.info(`Published download message for video (Video: ${upload.id}, Message: ${messageId})`);
    return messageId;
  } catch (err) {
    logger.error(`Error publishing download job ${err}`);
    throw err;
  }
};
