import { IApolloContext } from '../../apollo';

import { rule } from 'graphql-shield';
import { hasRole } from '.';

export default {
  canListAllUploads: rule()(
    async (parent, args, ctx: IApolloContext, info) => {
      return hasRole('LIST_ALL_UPLOADS', ctx);
    },
  ),
  canCreateUpload: rule()(
    async (parent, args, ctx: IApolloContext, info) => {
      return hasRole('CREATE_UPLOAD', ctx);
    },
  ),
  canDeleteUpload: rule()(
    async (parent, args, ctx: IApolloContext, info) => {
      return hasRole('DELETE_UPLOADS', ctx);
    },
  ),
  canProcessUpload: rule()(
    async (parent, args, ctx: IApolloContext, info) => {
      return hasRole('ADVANCE_UPLOADS', ctx);
    },
  ),
};
