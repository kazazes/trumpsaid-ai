import redis from 'redis';
import { exit } from 'shelljs';
import logger from '../util/logger';
import secrets from './secrets';

export const testServerConnections = () => {
  return Promise.all([
    testRedisConnection()
      .then((pong) => {
        logger.debug(`Redis client connected in ${pong}ms (${secrets.REDIS_HOST}:${secrets.REDIS_PORT})`);
      }),
  ])
    .catch((err) => {
      logger.error(err);
      exit(1);
    });
};

export const testRedisConnection = () => {
  return new Promise((resolve, reject) => {
    const start = new Date().getMilliseconds();
    const timeout = setTimeout(() => reject(new Error(`Redis connection timed out ${secrets.REDIS_HOST}:${secrets.REDIS_PORT}`)), 5000);
    const client = redis.createClient(Number(secrets.REDIS_PORT), secrets.REDIS_HOST, {});
    client.ping(() => {
      clearTimeout(timeout);
      const end = new Date().getMilliseconds();
      resolve(end - start);
    });
  });
};
