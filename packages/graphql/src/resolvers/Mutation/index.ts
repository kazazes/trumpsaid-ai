import Conversations from './Conversations';
import VideoUploads from './VideoUploads';

// FIXME: TSC 3.0.1 bug won't resolve IApolloContext in generated definitions, so including manually. Remove, compile, check generated definition to see if fixed.
import { IApolloContext } from '../../apollo';
const a: IApolloContext = undefined;
// tslint:disable-next-line:no-unused-expression
a;

export default {
  ...VideoUploads,
  ...Conversations,
};
