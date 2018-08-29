// tslint:disable-next-line:no-var-requires
require("@google-cloud/trace-agent").start();
// tslint:disable-next-line:no-var-requires
require("@google-cloud/debug-agent").start({
  projectId: process.env.GOOGLE_PROJECT_ID,
  serviceContext: {
    service: "WORKER",
    version: "ALPHA"
  }
});
import { config } from "dotenv";
config({ path: __dirname + "/../.env" });
import { nativeDependencies } from "@trumpsaid/common";

nativeDependencies();

import serverHealth from "server-health";
import VideoDownloadPubSubController from "./VideoDownload/VideoDownloadPubSubController";
import VideoRenderPubSubController from "./VideoRender/VideoRenderPubSubController";
import VideoThumbnailPubSubController from "./VideoThumbnail/VideoThumbnailPubSubController";

const nodeServer = serverHealth.createNodeHttpHealthCheckServer();
nodeServer.listen(3001);

// tslint:disable:no-unused-expression
new VideoDownloadPubSubController();
new VideoRenderPubSubController();
new VideoThumbnailPubSubController();
