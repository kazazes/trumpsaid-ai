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

import { nativeDependencies } from "@trumpsaid/common";
import { config } from "dotenv";
import VideoDownloadPubSubController from "./VideoDownload/VideoDownloadPubSubController";
import VideoRenderPubSubController from "./VideoRender/VideoRenderPubSubController";
import VideoThumbnailPubSubController from "./VideoThumbnail/VideoThumbnailPubSubController";

config({ path: __dirname + "/../.env" });

nativeDependencies();

// tslint:disable:no-unused-expression
new VideoDownloadPubSubController();
new VideoRenderPubSubController();
new VideoThumbnailPubSubController();
