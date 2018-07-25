import errorhandler from 'errorhandler';
import app from './app';
import logger from './util/logger';
import { testServerConnections } from './util/testServerConnections';

let server;
export default server;

const startServer = async () => {
  await testServerConnections();

  /**
   * Error Handler. Provides full stack - remove for production
   */
  app.use(errorhandler());

  /**
   * Start Express server.
   */
  server = app.listen(app.get('port'), app.get('host'), () => {
    logger.info(
      `Trump Said WTF webserver is running at http://${app.get('hostname')}:${app.get('port')} in ${app.get('env')} mode`);
  });
};

// tslint:disable-next-line:no-floating-promises
startServer();
