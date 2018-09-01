import { config } from "dotenv";
config({ path: __dirname + "/../.env" });

if (process.env.GOOGLE_TRACE_ENABLED) {
  // tslint:disable-next-line:no-var-requires
  require("@google-cloud/trace-agent").start({ projectId: process.env.GOOGLE_PROJECT_ID });
  // tslint:disable-next-line:no-var-requires
  require("@google-cloud/debug-agent").start({
    projectId: process.env.GOOGLE_PROJECT_ID,
    serviceContext: {
      service: "WORKER",
      version: "ALPHA"
    }
  });
}

import { logger, nativeDependencies } from "@trumpsaid/common";

nativeDependencies();

import serverHealth from "server-health";
import VideoDownloadPubSubController from "./VideoDownload/VideoDownloadPubSubController";
import VideoRenderPubSubController from "./VideoRender/VideoRenderPubSubController";
import VideoThumbnailPubSubController from "./VideoThumbnail/VideoThumbnailPubSubController";

const nodeServer = serverHealth.createNodeHttpHealthCheckServer();
nodeServer.listen(3001);

logger.debug('Healthcheck running on :3001')

const workers = [
  new VideoDownloadPubSubController(),
  new VideoRenderPubSubController(),
  new VideoThumbnailPubSubController()
];

logger.debug(`${workers.length} workers started.`);
