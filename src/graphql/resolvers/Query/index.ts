import Speaker from './Speaker';
import User from './User';
import VideoUploads from './VideoUploads';

export default {
  ...VideoUploads,
  ...User,
  ...Speaker,
};
