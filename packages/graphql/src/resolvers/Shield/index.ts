import logger from '@trumpsaid/common/logger';
import { shield } from 'graphql-shield';
import { includes } from 'lodash';
import { IApolloContext } from '../../apollo';
import { AdminRole } from '../../generated/prisma';
import rules from './rules';

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
