import Storage, { Bucket } from '@google-cloud/storage';
import { existsSync } from 'fs';
import hasha from 'hasha';
import { mkdirSync } from 'mkdir-recursive';
import moment from 'moment';

import logger from './logger';

export interface IDownloadableItem {
  bucket: string;
  path: string;
}

export const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
});

export const processingBucket = storage.bucket(process.env.VIDEO_PROCESSING_BUCKET);
export const publishedBucket = storage.bucket(process.env.VIDEO_PUBLISHED_BUCKET);
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
    .catch((e: any) => {
      logger.error(`Error making file public ${bucketName}/${path}\n${e}`);
    });
};

export const copyItemToPublished = async (item: IDownloadableItem, newTitle: string) => {
  try {
    const file = await processingBucket.getFiles({ prefix: item.path });
    const copy = await file[0][0].copy(publishedBucket);
    const copied = copy[0];
    // const metadata = (await copied.getMetadata())[0];
    // const path = metadata.name.replace(new RegExp(`/${search}/g`), replace);
    return copied;
  } catch(e) {
    logger.error(e);
    throw e;
  }

};

 /**
  * @description Download Google Cloud file locally
  * @param {Storage.File} sourceFile
  * @param {boolean} [force] - Force redownload, even file is already on disk
  * @returns {string} The path.
  */
export const downloadSourceFile = async (sourceFile: Storage.File) => {
  // Matches filename part of path
  const idRegex = new RegExp('\/.+\.*$');
  const tmpRoot = '/tmp/ts-wtf/';

  // Create dir tmpRoot/ObjectID
  const destinationDir = `${tmpRoot}${sourceFile.name.replace(idRegex, '')}/`;
  const destination = `${tmpRoot}${sourceFile.name}`;

  logger.debug(`Downloading ${sourceFile.name} to ${tmpRoot}`);
  const start = moment();

  if (existsSync(destination)) {
    const remoteMetadata = await sourceFile.getMetadata();
    const fileMetadata = remoteMetadata[0];
    const remoteMD5 = fileMetadata.md5Hash;
    const localMD5 = hasha.fromFileSync(destination, { algorithm: 'md5', encoding: 'base64' });
    if (remoteMD5 === localMD5) {
      logger.verbose('Remote MD5 matches local file, skipping.');
      return destination;
    }
  }

  mkdirSync(destinationDir);

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

export const downloadStorageItem = async (storageItem: IDownloadableItem) => {
  const file = storage.bucket(storageItem.bucket).file(storageItem.path);
  return downloadSourceFile(file);
};

export const downloadNewStorageItems = async (storageItems: IDownloadableItem[]) => {
  return Promise.all(storageItems.map((item: IDownloadableItem) => {
    return downloadNewStorageItem(item);
  }))
  .catch((e) => {
    logger.error('Could not download new source links locally', e);
    return Promise.reject();
  });
};

export const downloadNewStorageItem = async (storageItem: IDownloadableItem) => {
  const file = storage.bucket(storageItem.bucket).file(storageItem.path);
  return downloadSourceFile(file);
};

export const getReadStream = (source: IDownloadableItem) => {
  return storage.bucket(source.bucket).file(source.path).createReadStream();
};

export const getFileSize = async (source: IDownloadableItem) => {
  const metadata = await storage.bucket(source.bucket).file(source.path).getMetadata();
  return metadata[0].size;
};

export const filenameFromPath = (path: string) => {
  // TODO: FIX
  const regex = new RegExp('^(.*/)+');
  return path.replace(regex, '');
};
export const directoryFromPath = (path: string) => {
  const regex = new RegExp('[^\/]*$');
  return path.replace(regex, '');
};
export const filenameWithoutPathOrExtension = (path: string) => {
  // FIXME: My RegEx is broken.
  // const matchExtension = new RegExp('(\.\w+$)');
  return filenameFromPath(path).split('.')[0];
};

export const getExtension = (path: string) => {
  return filenameFromPath(path).split('.').pop();
};
