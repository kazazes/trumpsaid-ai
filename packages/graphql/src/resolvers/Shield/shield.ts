import { shield } from 'graphql-shield';
import rules from './rules';

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
