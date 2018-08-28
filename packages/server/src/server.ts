require('@google-cloud/trace-agent').start();
require('@google-cloud/debug-agent').start({
  projectId: process.env.GOOGLE_PROJECT_ID,
  serviceContext: {
    service: process.env.SERVER_TYPE,
  },
});

import { config } from 'dotenv';
config({ path: __dirname + '/../.env' });

import { logger, testRemoteConnections } from '@trumpsaid/common';
import errorhandler from 'errorhandler';
import app from './app';

let server;
export default server;

const startServer = async () => {
  await testRemoteConnections();

  if (process.env.NODE_ENV !== 'production') {
    app.use(errorhandler());
  }

  server = app.listen(app.get('port'), app.get('host'), () => {
    logger.info(
      `Trump Said WTF webserver is running at http://${app.get('hostname')}:${app.get('port')} in ${app.get('env')} mode`);
  });
};

if (process.env.SERVER_TYPE !== 'WORKER') {
// tslint:disable-next-line:no-floating-promises
  startServer();
}
