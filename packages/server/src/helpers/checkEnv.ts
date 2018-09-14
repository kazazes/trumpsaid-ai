import { logger } from '@trumpsaid/common';
import envfile from 'envfile';

const checkEnvironment = () => {
  const exampleEnv = envfile.parseFileSync(
    __dirname + '/../../.env.example',
  ) as any;
  const keys = Object.keys(exampleEnv);
  keys.forEach((key) => {
    if (process.env[key] === undefined) {
      throw new Error(
        `${key} is defined in example .env, but not in this process.`,
      );
    }
  });

  logger.silly("Process' environment matches example env");
};

export default checkEnvironment;
