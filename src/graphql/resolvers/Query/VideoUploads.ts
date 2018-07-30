import { IApolloContext } from '../../apollo';
import prismaContext from '../../prismaContext';

export default {
  videoUploads: (obj: any, args: any, ctx: IApolloContext, info: any) => {
    return prismaContext.query.videoUploads(
      {},
      ' { id status submittedUrl submitedBy { id displayName }}',
    );
  },
};
