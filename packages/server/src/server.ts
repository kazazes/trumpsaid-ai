import { config } from "dotenv";
import { existsSync } from "fs";

const envPath = existsSync(__dirname + "/../.env")
  ? __dirname + "/../.env"
  : __dirname + "/../.env.example";

config({ path: envPath });
// tslint:disable-next-line:no-var-requires
require("@google-cloud/trace-agent").start({
  projectId: process.env.GOOGLE_PROJECT_ID
});
// tslint:disable-next-line:no-var-requires
require("@google-cloud/debug-agent").start({
  projectId: process.env.GOOGLE_PROJECT_ID,
  serviceContext: {
    service: process.env.SERVER_TYPE,
    version: "ALPHA"
  }
});

import checkEnvironment from "./helpers/checkEnv";
checkEnvironment();

import { logger, testRemoteConnections } from "@trumpsaid/common";
import errorhandler from "errorhandler";
import app from "./app";

let server;
export default server;

const startServer = async () => {
  await testRemoteConnections();

  if (process.env.NODE_ENV !== "production") {
    app.use(errorhandler());
  }

  server = app.listen(app.get("port"), app.get("host"), () => {
    logger.info(
      `Trump Said webserver is running at http://${app.get(
        "hostname"
      )}:${app.get("port")} in ${app.get("env")} mode`
    );
  });
};

if (process.env.SERVER_TYPE !== "WORKER") {
  // tslint:disable-next-line:no-floating-promises
  startServer();
}
