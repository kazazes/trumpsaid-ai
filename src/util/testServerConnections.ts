import redis from 'redis';
import { exit } from 'shelljs';
import prisma, { prismaEndpoint } from '../graphql/prismaContext';
import logger from './logger';
import secrets from './secrets';

const connectionTimeout = 5000;

export const testServerConnections = () => {
  return Promise.all([
    testRedisConnection()
      .then((time) => {
        logger.debug(`Redis client connected in ${time}ms (${secrets.REDIS_HOST}:${secrets.REDIS_PORT})`);
      }),
    testPrismaConnection()
      .then((res: any) => {
        logger.debug(`Prisma server connected in ${res.time}ms. There are ${res.users} registered users. (${prismaEndpoint})`);
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
    const timeout = setTimeout(() => reject(new Error(`Redis connection timed out ${secrets.REDIS_HOST}:${secrets.REDIS_PORT}`)), connectionTimeout);
    const client = redis.createClient(Number(secrets.REDIS_PORT), secrets.REDIS_HOST, {});
    client.ping(() => {
      clearTimeout(timeout);
      const end = new Date().getMilliseconds();
      resolve(end - start);
    });
  });
};

export const testPrismaConnection = () => {
  return new Promise((resolve, reject) => {
    const start = new Date().getMilliseconds();
    const timeout = setTimeout(() => {
      logger.error(`Prisma connection timed out to ${prismaEndpoint}`);
      reject(new Error(`Prisma connection timed out to ${prismaEndpoint}`));
    },                         connectionTimeout);
    prisma.query.users({ where: {} }, ' { id } ')
      .then((users) => {
        clearTimeout(timeout);
        const end = new Date().getMilliseconds();
        const response = { time: end - start, users: users.length };
        resolve(response);
      })
      .catch((err) => {
        logger.error(`Error on connecting to Prisma at ${prismaEndpoint}`);
        process.exit(1);
      });
  });
};
