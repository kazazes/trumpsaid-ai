import Speaker from './Speaker';
import User from './User';
import VideoUploads from './VideoUploads';

// FIXME: TSC 3.0.1 bug won't resolve IApolloContext in generated definitions, so including manually. Remove, compile, check generated definition to see if fixed.
import { IApolloContext } from '../../apollo';
const _: IApolloContext = undefined;
_;

export default {
  ...VideoUploads,
  ...User,
  ...Speaker,
};
