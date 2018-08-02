import { VideoUpload } from '../graphql/generated/prisma';
import logger from '../util/logger';
import downloadController from './VideoDownloadPubSubController';
import renderController from './VideoRenderPubSubController';

export const publishDownloadJob = async(upload: VideoUpload) => {
  const dataBuffer = getBuffer(upload);
  try {
    const messageId = await downloadController.downloadTopic.publisher().publish(dataBuffer);
    logger.info(`Published download message for video (Video: ${upload.id}, Message: ${messageId})`);
    return messageId;
  } catch (err) {
    logger.error(`Error publishing download job ${err}`);
    throw err;
  }
};

export const publishRenderJob = async (upload: VideoUpload) => {
  const dataBuffer = getBuffer(upload);
  try {
    const messageId = await renderController.renderTopic.publisher().publish(dataBuffer);
    logger.info(`Published render message for video (Video: ${upload.id}, Message: ${messageId})`);
    return messageId;
  } catch (err) {
    logger.error(`Error publishing render job ${err}`);
    throw err;
  }
};

const getBuffer = (obj: any) => { return Buffer.from(JSON.stringify(obj)); };
