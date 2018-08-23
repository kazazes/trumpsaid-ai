import { IApolloContext } from '../../apollo';
import rules from './rules';

import { logger } from '@trumpsaid/common';
import { AdminRole } from '@trumpsaid/prisma';
import { shield } from 'graphql-shield';
import { includes } from 'lodash';

const getUserRoles = async (ctx: IApolloContext) => {
  const user = await ctx.db.query.user(
    { where: { id: ctx.user.id } },
    ' { adminRoles }',
  );
  return user.adminRoles;
};

export const hasRole = async (role: AdminRole, ctx: IApolloContext) => {
  const roles = await getUserRoles(ctx);
  const hasRole = includes(roles, role);
  if (!hasRole) {
    logger.warn(
      `Role mismatch error: ${ctx.user.displayName} (${
      ctx.user.id
      }) does not have role ${role}`,
    );
  }
  return hasRole;
};

const permissions = shield({
  Query: {
    videoUploads: rules.canListAllUploads,
  },
  Mutation: {
    createVideoUpload: rules.canCreateUpload,
    deleteVideoUpload: rules.canDeleteUpload,
  },
});

export default permissions;
