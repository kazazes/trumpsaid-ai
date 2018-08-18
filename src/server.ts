require('newrelic');
import errorhandler from 'errorhandler';
import app from './app';
import logger from './util/logger';
import checkNativeDependencies from './util/nativeDependencies';
import secrets, { ServerType } from './util/secrets';
import testRemoteConnections from './util/testRemoteConnections';

let server;
export default server;

const startServer = async () => {
  await testRemoteConnections();
  checkNativeDependencies();

  if (process.env.NODE_ENV !== 'production') {
    app.use(errorhandler());
  }

  server = app.listen(app.get('port'), app.get('host'), () => {
    logger.info(
      `Trump Said WTF webserver is running at http://${app.get('hostname')}:${app.get('port')} in ${app.get('env')} mode`);
  });
};

if (secrets.SERVER_TYPE !== ServerType.WORKER) {
// tslint:disable-next-line:no-floating-promises
  startServer();
}
