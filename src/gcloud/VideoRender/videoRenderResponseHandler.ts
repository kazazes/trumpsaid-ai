import { VideoStorageLink, VideoUpload } from '../../graphql/generated/prisma';
import prisma from '../../graphql/prismaContext';
import logger from '../../util/logger';
import { makeFilePublic } from '../storageController';

interface IRenderResponsePayload {
  requestPayload: VideoUpload;
  error: any;
  result: [VideoStorageLink];
}

export const renderVideoResponse = async (message: any) => {
  const renderResponsePayload = JSON.parse(
    Buffer.from(message.data, 'base64').toString(),
  ) as IRenderResponsePayload;

  if (renderResponsePayload.error) {
    logger.error(`Received error in response to render job: ${JSON.stringify(renderResponsePayload.error)}`);
    prisma.mutation.updateVideoUpload(
      { where: { id: renderResponsePayload.requestPayload.id }, data: { status: 'READY_TO_RENDER', state: 'PENDING' } })
    .catch(e => logger.error(`Error updating videoUpload in render response error handler: \n ${JSON.stringify(e)}`));
    return message.ack();
  }
  const existsInThisContext = await prisma.exists.VideoUpload({ id: renderResponsePayload.requestPayload.id });
  if (!existsInThisContext) {
    return message.nack();
  }

  await Promise.all(renderResponsePayload.result.map(async (link) => {
    const createdLink = await prisma.mutation.createVideoStorageLink({ data: link });
    await makeFilePublic(link.bucket, link.path);
    if (link.version === 'WEBM') {
      return prisma.mutation.updateVideoUpload({ where: { id: link.videoID }, data: { webmLink: { connect: { id: createdLink.id } } } });
    }

    if (link.version === 'MP4') {
      return prisma.mutation.updateVideoUpload({ where: { id: link.videoID }, data: { mp4Link: { connect: { id: createdLink.id } } } });
    }

    if (link.version === 'FLAC') {
      return prisma.mutation.updateVideoUpload({ where: { id: link.videoID }, data: { flacLink: { connect: { id: createdLink.id } } } });
    }

    logger.error(`Received invalid render response result version type ${link.version}\n\n${link}`);
    return Promise.reject();
  }));

  await prisma.mutation.updateVideoUpload(
    { where: { id: renderResponsePayload.requestPayload.id }, data: { state: 'PENDING', status: 'NEEDS_THUMBNAILS' } });

  message.ack();

  // tslint:disable-next-line:no-magic-numbers
  logger.info('RENDER RESPONSE ' + JSON.stringify(renderResponsePayload, null, 2));
};

export default renderVideoResponse;
