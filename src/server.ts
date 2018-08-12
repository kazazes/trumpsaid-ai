import errorhandler from 'errorhandler';
import app from './app';
import logger from './util/logger';
import secrets, { ServerType } from './util/secrets';
import { testServerConnections } from './util/testServerConnections';

let server;
export default server;

const startServer = async () => {
  await testServerConnections();

  if (process.env.NODE_ENV !== 'production') {
    app.use(errorhandler());
  }

  /**
   * Start Express server.
   */
  server = app.listen(app.get('port'), app.get('host'), () => {
    logger.info(
      `Trump Said WTF webserver is running at http://${app.get('hostname')}:${app.get('port')} in ${app.get('env')} mode`);
  });
};

if (secrets.SERVER_TYPE !== ServerType.WORKER) {
// tslint:disable-next-line:no-floating-promises
  startServer();
}
