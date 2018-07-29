import prismaContext from '../../prismaContext';

export default {
  videoUploads: () => {
    return prismaContext.query.videoUploads({});
  },
};
