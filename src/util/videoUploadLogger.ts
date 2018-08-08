import { Moment } from 'moment';
import { VideoUpload, VideoUploadLogItemEvent, VideoUploadLogItemStatus } from '../graphql/generated/prisma';
import prisma from '../graphql/prismaContext';
import logger from './logger';

 /**
 * Writes a log message to a VideoUpload's log.
 * @param {VideoUpload} videoUpload
 * @param {VideoUploadLogItemStatus} status
 * @param {VideoUploadLogItemEvent} event
 * @param {string} [message]
 * @param {Moment} [timeout]
 */
export const writeToVideoUploadLog = (
  videoUpload: VideoUpload, status: VideoUploadLogItemStatus, event: VideoUploadLogItemEvent, message?: any, timeout?: Moment) => {
  let timesoutAt;

  if (timeout) {
    timesoutAt = timeout.milliseconds();
  }

  let msg: string;
  if (typeof message === 'string') {
    msg = message as string;
  } else {
    msg = JSON.stringify(message);
  }

  prisma.mutation.createVideoUploadStatusLogItem({
    data: {
      status,
      event,
      timesoutAt,
      message: msg,
      videoUpload: { connect: { id: videoUpload.id } },
    },
  })
    .catch(e => logger.error(`Writing to VideoUpload ${videoUpload.id} failed: \n ${JSON.stringify(e, null, 2)}`));
};

export default writeToVideoUploadLog;
