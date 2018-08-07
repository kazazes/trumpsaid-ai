import Storage, { Bucket } from '@google-cloud/storage';
import { mkdirSync } from 'mkdir-recursive';
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

export const downloadSourceFile = async (sourceFile: Storage.File) => {
  // Matches filename part of path
  const idRegex = new RegExp('\/.+\.*$');
  const tmpRoot = '/tmp/ts-wtf/';

  // Create dir tmpRoot/ObjectID
  const destinationDir = `${tmpRoot}${sourceFile.name.replace(idRegex, '')}/`;
  mkdirSync(destinationDir);

  const destination = `${tmpRoot}${sourceFile.name}`;
  logger.info(`Downloading ${sourceFile.name} to ${tmpRoot}`);

  const error = await sourceFile.download({
    destination,
  });

  if (error.length > 0) {
    logger.error(`Error downloading file: ${JSON.stringify(error)}`);
    throw error;
  } else {
    return destination;
  }
};
