import Storage, { Bucket } from '@google-cloud/storage';
import fs from 'fs';
import { mkdirSync } from 'mkdir-recursive';
import moment from 'moment';
import { VideoUploadStorageLink } from '../graphql/generated/prisma';
import logger from '../util/logger';
import secrets from '../util/secrets';

export const storage = Storage({
  projectId: secrets.GOOGLE_PROJECT_ID,
});

export const processingBucketName = 'ts-video-processing';

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
  bucket.file(path).makePublic()
    .then(() => {
      logger.info(`Made ${bucketName}/${path} public`);
    })
    .catch((e) => {
      logger.error(`Error making file public ${bucketName}/${path}\n${e}`);
    });
};

 /**
 * @description Download Google Cloud file locally
 * @param {Storage.File} sourceFile
 * @param {boolean} [force] - Force redownload, even file is already on disk
 * @returns {string} The path.
 */
export const downloadSourceFile = async (sourceFile: Storage.File, force?: boolean) => {
  // Matches filename part of path
  const idRegex = new RegExp('\/.+\.*$');
  const tmpRoot = '/tmp/ts-wtf/';

  // Create dir tmpRoot/ObjectID
  const destinationDir = `${tmpRoot}${sourceFile.name.replace(idRegex, '')}/`;

  const destination = `${tmpRoot}${sourceFile.name}`;
  if (!force) {
    const exists = fs.existsSync(destination);
    if (exists) {
      return destination;
    }
  }

  mkdirSync(destinationDir);

  logger.debug(`Downloading ${sourceFile.name} to ${tmpRoot}`);
  const start = moment();

  const error = await sourceFile.download({
    destination,
  });

  if (error.length > 0) {
    logger.error(`Error downloading file: ${JSON.stringify(error)}`);
    throw error;
  } else {
    logger.debug(`Downloaded ${sourceFile.name} in ${moment().from(start, true)}.`);
    return destination;
  }
};

export const downloadStorageItem = async (storageItem: VideoUploadStorageLink, force?: boolean) => {
  const file = storage.bucket(storageItem.bucket).file(storageItem.path);
  return downloadSourceFile(file, force);
};

export const getReadStream = (source: VideoUploadStorageLink) => {
  return storage.bucket(source.bucket).file(source.path).createReadStream();
};

export const getFileSize = async (source: VideoUploadStorageLink) => {
  const metadata = await storage.bucket(source.bucket).file(source.path).getMetadata();
  return metadata[0].size;
};

export const filenameFromPath = (path: string) => {
  const regex = new RegExp('\w+(?:\.\w+)*$');
  return path.replace(regex, '');
};
export const directoryFromPath = (path: string) => {
  const regex = new RegExp('[^\/]*$');
  return path.replace(regex, '');
};
export const filenameWithoutPathOrExtension = (path: string) => {
  const matchExtension = new RegExp('.\w+$');
  return this.filenameFromPath(path).replace(matchExtension, '');
};
