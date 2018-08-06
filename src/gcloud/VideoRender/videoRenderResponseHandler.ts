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

  const existsInThisContext = await prisma.exists.VideoUpload({ id: renderResponsePayload.requestPayload.id });
  if (!existsInThisContext) {
    return message.nack();
  }

  if (renderResponsePayload.error) {
    message.ack();
    logger.error('Render response error: ' + JSON.stringify(renderResponsePayload.error));
    return;
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

    logger.error(`Received invalid render response result version type ${link.version}\n\n${link}`);
  }));

  await prisma.mutation.updateVideoUpload(
    { where: { id: renderResponsePayload.requestPayload.id }, data: { state: 'PENDING', status: 'NEEDS_THUMBNAILS' } });

  message.ack();

  // tslint:disable-next-line:no-magic-numbers
  logger.info('RENDER RESPONSE ' + JSON.stringify(renderResponsePayload, null, 2));
};

export default renderVideoResponse;
