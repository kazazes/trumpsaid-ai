import { Thumbnail } from '../../graphql/generated/prisma';
import prisma from '../../graphql/prismaContext';
import logger from '../../util/logger';
import { makeFilePublic } from '../storageController';
import { IThumbnailRequest } from './videoThumbnailHandler';

interface IThumbnailResponsePayload {
  requestPayload: IThumbnailRequest;
  error: any;
  result: Thumbnail;
}

export const thumbnailResponse = async (message: any) => {
  const renderResponsePayload = JSON.parse(
    Buffer.from(message.data, 'base64').toString(),
  ) as IThumbnailResponsePayload;

  if (renderResponsePayload.error) {
    message.ack();
    logger.error('Render response error: ' + JSON.stringify(renderResponsePayload.error));
    return;
  }

  const upload = renderResponsePayload.requestPayload.upload;
  const result = renderResponsePayload.result;

  const existsInThisContext = await prisma.exists.VideoUpload({ id: upload.id });
  if (!existsInThisContext) {
    return message.nack();
  }

  makeFilePublic(result.bucket, result.path)
    .catch(e => logger.error(`Error making ${result.bucket}/${result.path} public.\n${e}`));
  const createdThumbnail = await prisma.mutation.createThumbnail({ data: result });
  const updatedVideo = await prisma.mutation
    .updateVideoUpload(
    {
      where: { id: upload.id },
      data: {
        thumbnail: {
          connect: { id: createdThumbnail.id },
        },
        state: 'PENDING',
        status: 'NEEDS_REVIEW',
      },
    });
  message.ack();
  logger.debug(`Set thumbnail on ${updatedVideo.id}, status: ${updatedVideo.status}, state: ${updatedVideo.state}`);
};

export default thumbnailResponse;
