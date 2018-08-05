import { and, not, or, rule, shield } from 'graphql-shield';
import { includes } from 'lodash';
import logger from '../../../util/logger';
import { IApolloContext } from '../../apollo';
import { AdminRole, Mutation, User } from '../../generated/prisma';
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
  if (hasRole) return hasRole;
  logger.warn(
    `Role mismatch error: ${ctx.user.displayName} (${
      ctx.user.id
    }) does not have role ${role}`,
  );
};

// Permissions

const permissions = shield({
  Query: {
    videoUploads: rules.canListAllUploads,
    videoUpload: rules.canProcessUpload,
  },
  Mutation: {
    createVideoUpload: rules.canCreateUpload,
    startProcessingPipeline: rules.canProcessUpload,
  },
});

export default permissions;
