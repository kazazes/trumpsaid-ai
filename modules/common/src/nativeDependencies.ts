import { which } from 'shelljs';
import logger from './logger';

export const checkNativeDependencies = () => {
  let errored = false;

  if (!which('MP4Box')) {
    logger.error('MP4Box is required and not in path.');
    errored = true;
  }

  if (!which('ffmpeg')) {
    logger.error('ffmpeg is required and not in path.');
    errored = true;
  }

  if (errored) {
    process.exit(1);
  }
};

export default checkNativeDependencies;
