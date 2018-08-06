import Storage, { Bucket } from '@google-cloud/storage';
import logger from '../util/logger';
import secrets from '../util/secrets';

export const storage = Storage({
  projectId: secrets.GOOGLE_PROJECT_ID,
});

const processingBucketName = 'ts-video-processing';

export const processingBucket = storage.bucket(processingBucketName);
export const delimiter = '/';

export const createFileInProcessing = (path: string, filename: string) => {
  return createFile(processingBucket, path, filename);
};

export const deleteFolderInProcessing = (path: string) => {
  return deletePrefix(processingBucket, path)
    .catch((e) => {
      logger.error(`Error deleting folder in bucket ${processingBucket.name} with path ${path}`);
    });
};

export const deletePrefix = async (bucket: Bucket, prefix: string) => {
  return bucket.deleteFiles({
    prefix,
  });
};

export const createFile = (bucket: Bucket, path: string, filename: string) => {
  return bucket.file(path + filename);
};

export const makeFilePublic = (bucketName: string, path: string) => {
  const bucket = storage.bucket(bucketName);
  return bucket.file(path).makePublic()
    .then(() => {
      logger.info(`Made ${bucketName}/${path} public`);
    })
    .catch((e) => {
      logger.error(`Error making file public ${bucketName}/${path}\n${e}`);
    });
};
