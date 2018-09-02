import { File } from "@google-cloud/storage";
// tslint:disable-next-line:no-var-requires
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
import {
  createFileInProcessing,
  directoryFromPath,
  downloadNewStorageItems,
  downloadStorageItem,
  filenameWithoutPathOrExtension,
  getExtension,
  logger
} from "@trumpsaid/common";
import {
  VideoUpload,
  VideoUploadFileLinkType,
  VideoUploadStorageLink,
  VideoUploadStorageLinkCreateInput
} from "@trumpsaid/prisma";
import {
  IPubSubConsumerFailedResponse,
  IPubSubConsumerPayload,
  IVideoRenderFailedMessage,
  IVideoRenderSuccessMessage,
  PubSubHandler
} from "@trumpsaid/pubsub";
import sleep from "await-sleep";
import fluentFfmpeg, { FfmpegCommand } from "fluent-ffmpeg";
import fs from "fs";
import FormatTimestamp from "hh-mm-ss";
import * as math from "mathjs";
import moment, { Moment } from "moment";
import { cpus } from "os";
import { exec, ls } from "shelljs";
import VideoRenderPubSubController from "./VideoRenderPubSubController";

interface IFfmpegStage {
  ffmpeg: FfmpegCommand;
  renderOutput: File;
  masterLocalPath: string;
  start: Moment;
  path: string;
  inputFormat: string;
  renderStart: string;
  renderEnd: string;
}

interface IMP4DashOption {
  fps: number;
  bitrate: string;
  height: number;
  bufferSize: string;
  scaleHeight: number;
}

export default class VideoRenderHandler extends PubSubHandler {
  constructor(timeout: number, controller: VideoRenderPubSubController) {
    super(timeout, controller);
  }
  public async requestHandler(message: IPubSubConsumerPayload) {
    if (this.activeJobs >= this.maxJobs) {
      return message.nack();
    }
    this.activeJobs = this.activeJobs + 1;

    message.ack();
    const timer = this.startTimer(message);
    return new Promise<void>(async (resolve, reject) => {
      const videoUpload = this.pubSubController.parseMessageData(
        message
      ) as VideoUpload;

      logger.info(`Handling render for ${videoUpload.id}`);

      const storageLinks = videoUpload.storageLinks;

      const hasAMaster = storageLinks.find(link => {
        return (
          link.version === "MASTER" &&
          (link.fileType === "MP4" || link.fileType === "WEBM")
        );
      });

      if (!hasAMaster) {
        const err =
          "Renderer was given a job which has no video masters. Aborting.";
        logger.error(err);
        const resp: IVideoRenderFailedMessage = {
          requestPayload: videoUpload,
          error: err
        };
        this.failed(resp, timer);
        return reject();
      }

      const encodeFormats: VideoUploadFileLinkType[] = [];
      const transcodeFormats: VideoUploadFileLinkType[] = [];

      // Don't include MP4_DASH, as it is automatically generated with MP4 Encode
      const formats: VideoUploadFileLinkType[] = ["MP4", "WEBM", "AUDIO"];
      formats.map(fileLinkType => {
        const hasMaster = storageLinks.find(link => {
          return link.fileType === fileLinkType && link.version === "MASTER";
        });

        const hasWeb = storageLinks.find(link => {
          return link.fileType === fileLinkType && link.version === "WEB";
        });
        if (hasMaster && !hasWeb) {
          encodeFormats.push(fileLinkType as VideoUploadFileLinkType);
        } else if (!hasMaster && !hasWeb) {
          transcodeFormats.push(fileLinkType as VideoUploadFileLinkType);
        }
      });

      if (encodeFormats.length < 1 && transcodeFormats.length < 1) {
        logger.warn(`Nothing to encode or transcode for ${videoUpload.id}.`);
        const response: IVideoRenderSuccessMessage = {
          videoUpload,
          storageLinkCreateInputs: []
        };

        this.succeeded(response, timer);
        return resolve();
      }
      logger.info(
        `Rendering with ${encodeFormats.length} encode and ${
          transcodeFormats.length
        } transcode jobs.`
      );
      if (encodeFormats.length > 0) {
        logger.info(`\tEncode: ${encodeFormats.join(", ")}`);
      }
      if (transcodeFormats.length > 0) {
        logger.info(`\tTranscode to: ${transcodeFormats.join(", ")}`);
      }

      const renderResults: VideoUploadStorageLinkCreateInput[] = [];

      for (const format of transcodeFormats) {
        try {
          const storageCreateInputs = await this.transcode(
            format,
            storageLinks
          );
          storageCreateInputs.forEach(createInput =>
            renderResults.push(createInput)
          );
          this.update({
            videoUpload,
            storageLinkCreateInputs: storageCreateInputs
          });
        } catch (e) {
          logger.error("Rendering error occured! See above.");
          logger.error(JSON.stringify(e));
        }
      }

      for (const format of encodeFormats) {
        try {
          const storageCreateInputs = await this.encode(format, storageLinks);
          storageCreateInputs.forEach(createInput =>
            renderResults.push(createInput)
          );
          this.update({
            videoUpload,
            storageLinkCreateInputs: storageCreateInputs
          });
        } catch (e) {
          logger.error("Rendering error occured! See above.");
          logger.error(JSON.stringify(e));
        }
      }

      if (process.env.NODE_ENV !== "production") {
        await sleep(5000);
        await downloadNewStorageItems(renderResults);
      }

      this.succeeded(undefined, timer);
      resolve();
    });
  }
  protected timedOut(payload: IPubSubConsumerPayload): void {
    const resp: IPubSubConsumerFailedResponse = {
      requestPayload: payload,
      error: new Error("Render handler timed out")
    };
    this.failed(resp);
  }
  private async encode(
    format: VideoUploadFileLinkType,
    storageLinks: VideoUploadStorageLink[]
  ): Promise<VideoUploadStorageLinkCreateInput[]> {
    const master = storageLinks.find(link => {
      return link.version === "MASTER" && link.fileType === format;
    });
    switch (format) {
      case "MP4":
        return this.encodeMP4(master);
      case "WEBM":
        return this.encodeWebM(master);
      case "AUDIO":
        return this.encodeAudio(master);
      default:
        logger.error(`${format} does not match any known encode types.`);
        throw new Error(`${format} does not match any known encode types.`);
    }
  }
  private async transcode(
    format: VideoUploadFileLinkType,
    storageLinks: VideoUploadStorageLink[]
  ): Promise<VideoUploadStorageLinkCreateInput[]> {
    let master;
    switch (format) {
      case "MP4":
        master = storageLinks.find(
          link => link.version === "MASTER" && link.fileType === "WEBM"
        );
        break;
      case "WEBM":
        master = storageLinks.find(
          link => link.version === "MASTER" && link.fileType === "MP4"
        );
        break;
      case "AUDIO":
        master = storageLinks.find(
          link =>
            link.version === "MASTER" &&
            (link.fileType === "MP4" || link.fileType === "WEBM")
        );
        break;
      default:
        logger.error(`${format} does not match any known transcode types.`);
        throw new Error(`${format} does not match any known transcode types.`);
    }

    if (!master) {
      logger.error(`No master found for transcode to ${format}! Aborting.`);
      throw new Error(`No master found for transcode to ${format}! Aborting.`);
    }

    switch (format) {
      case "MP4":
        return this.transcodeToMP4(master);
      case "WEBM":
        return this.transcodeToWebM(master);
      case "AUDIO":
        return this.transcodeToAudio(master);
      default:
        logger.error(`${format} does not match any known transcode types.`);
        throw new Error(`${format} does not match any known transcode types.`);
    }
  }
  private async stageRender(
    master: VideoUploadStorageLink,
    extension: string,
    existingMasterPath?: string
  ): Promise<IFfmpegStage> {
    const inputFormat = getExtension(master.path);
    let masterLocalPath = existingMasterPath;
    if (!masterLocalPath) {
      masterLocalPath = await downloadStorageItem(master);
    }
    const remoteDirectory = directoryFromPath(master.path);
    const strippedFilename = filenameWithoutPathOrExtension(master.path);
    const path = `${remoteDirectory}${strippedFilename}${extension}`;
    const renderOutput = createFileInProcessing(
      remoteDirectory,
      strippedFilename + extension
    );
    const ffmpeg = this.getFfmpeg();
    const renderStart = FormatTimestamp.fromS(
      master.videoUpload.metadata.renderStart,
      "hh:mm:ss"
    );
    const end = master.videoUpload.metadata.renderEnd;
    const renderEnd = FormatTimestamp.fromS(end > 0 ? end : 7200, "hh:mm:ss");
    return {
      path,
      ffmpeg,
      masterLocalPath,
      renderOutput,
      inputFormat,
      renderStart,
      renderEnd,
      start: moment()
    };
  }
  private getFfmpeg(): FfmpegCommand {
    const ffmpeg = fluentFfmpeg({ logger });
    return ffmpeg.setFfmpegPath(ffmpegPath);
  }
  private async encodeMP4(
    master: VideoUploadStorageLink
  ): Promise<VideoUploadStorageLinkCreateInput[]> {
    const stage = await this.stageRender(master, "-web.mp4");
    const {
      ffmpeg,
      renderOutput,
      masterLocalPath,
      path,
      start,
      inputFormat,
      renderEnd,
      renderStart
    } = stage;
    await new Promise<File>((resolve, reject) => {
      ffmpeg
        .input(masterLocalPath)
        .inputFormat(inputFormat)
        .format("mp4")
        .videoCodec("libx264")
        .audioCodec("aac")
        .seekInput(renderStart)
        .outputOptions(`-to ${renderEnd}`)
        .outputOptions("-vprofile high")
        .outputOptions("-crf 24")
        .outputOptions("-movflags faststart+frag_keyframe+empty_moov")
        .outputOptions("-preset slow")
        .outputOptions("-map_metadata -1")
        .on("start", cmdLine => {
          logger.info("Started ffmpeg with command: " + cmdLine);
        })
        .on("end", () => {
          logger.info(`Successfully encoded video as MP4 ${start.toNow()}`);
          resolve(renderOutput);
        })
        .on("error", (err, stdout, stderr) => {
          logger.error(
            "An error occured during encoding: ",
            JSON.stringify(err)
          );
          logger.error(stdout);
          logger.error(stderr);
          reject(err);
        })
        .writeToStream(
          renderOutput.createWriteStream({ contentType: "video/mp4" }),
          { end: true }
        );
    }).catch(e => {
      logger.error(JSON.stringify(e));
      throw e;
    });

    const mp4CreateInput: VideoUploadStorageLinkCreateInput = {
      path,
      bucket: process.env.VIDEO_PROCESSING_BUCKET,
      version: "WEB",
      fileType: "MP4",
      mimeType: "video/mp4",
      videoUpload: { connect: { id: master.videoUpload.id } }
    };

    const mp4DashVersions = await this.encodeMP4Dash(masterLocalPath, master);

    return [mp4CreateInput, ...mp4DashVersions];
  }
  private getMetadata(path: string): Promise<any> {
    const ffmpeg = this.getFfmpeg();
    return new Promise((resolve, reject) => {
      ffmpeg.input(path).ffprobe((err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data.streams[0]);
      });
    });
  }
  private async encodeAACAudio(
    masterPath: string,
    master: VideoUploadStorageLink
  ): Promise<[VideoUploadStorageLinkCreateInput, string]> {
    const stage = await this.stageRender(master, `-web-audio.mp4`, masterPath);
    const {
      ffmpeg,
      renderOutput,
      path,
      inputFormat,
      renderStart,
      renderEnd
    } = stage;
    const aacOutputPath = `/tmp/ts-wtf/${directoryFromPath(
      master.path
    )}${filenameWithoutPathOrExtension(master.path)}-web-audio.mp4`;

    await new Promise<string>((resolve, reject) => {
      ffmpeg
        .input(masterPath)
        .seekInput(renderStart)
        .outputOptions(`-to ${renderEnd}`)
        .inputFormat(inputFormat)
        .outputFormat("mp4")
        .audioCodec("aac")
        .audioChannels(2)
        .audioBitrate("128k")
        .noVideo()
        .on("start", cmdLine => {
          logger.info("Started ffmpeg with command: " + cmdLine);
        })
        .on("end", () => {
          logger.info(`Successfully extracted AAC audio as MP4`);
          resolve(aacOutputPath);
        })
        .on("error", (err, stdout, stderr) => {
          logger.error(
            "An error occured during audio extraction: ",
            JSON.stringify(err)
          );
          logger.error(stdout);
          logger.error(stderr);
          reject(err);
        })
        .output(aacOutputPath)
        .run();
    }).catch(e => {
      logger.error(JSON.stringify(e));
      throw e;
    });

    const writeStream = renderOutput.createWriteStream({
      contentType: "video/mp4",
      resumable: false
    });
    const aacFileLocal = fs.createReadStream(aacOutputPath);
    aacFileLocal.pipe(
      writeStream,
      { end: true }
    );

    const mp4CreateInput: VideoUploadStorageLinkCreateInput = {
      path,
      bucket: process.env.VIDEO_PROCESSING_BUCKET,
      version: "WEB",
      fileType: "MP4_DASH",
      mimeType: "video/mp4",
      videoUpload: { connect: { id: master.videoUpload.id } }
    };

    return [mp4CreateInput, aacOutputPath];
  }
  private async encodeMP4DashWithOptions(
    masterPath: string,
    master: VideoUploadStorageLink,
    format: IMP4DashOption
  ): Promise<[VideoUploadStorageLinkCreateInput, string]> {
    const stage = await this.stageRender(
      master,
      `-web-${format.height}.mp4`,
      masterPath
    );
    const {
      ffmpeg,
      renderOutput,
      masterLocalPath,
      path,
      start,
      inputFormat,
      renderEnd,
      renderStart
    } = stage;
    const mp4DashOutputPath = `/tmp/ts-wtf/${directoryFromPath(
      master.path
    )}${filenameWithoutPathOrExtension(master.path)}-web-${format.height}.mp4`;
    await new Promise<string>((resolve, reject) => {
      ffmpeg
        .input(masterLocalPath)
        .inputFormat(inputFormat)
        .noAudio()
        .format("mp4")
        .videoCodec("libx264")
        .seekInput(renderStart)
        .outputOptions(`-to ${renderEnd}`)
        .outputOptions(
          `-x264opts keyint=${format.fps.toFixed(0)}:min-keyint=${
            format.fps
          }:no-scenecut`
        )
        .videoBitrate(format.bitrate)
        .outputOptions(`-maxrate ${format.bitrate}`)
        .outputOptions(`-bufsize ${format.bufferSize}`)
        .outputOptions(`-vf scale=-1:${format.scaleHeight}`)
        .outputOptions("-vprofile high")
        .outputOptions("-crf 24")
        .outputOptions("-movflags faststart+frag_keyframe+empty_moov")
        .outputOptions("-preset slow")
        .outputOptions("-map_metadata -1")
        .on("start", cmdLine => {
          logger.info("Started ffmpeg with command: " + cmdLine);
        })
        .on("end", () => {
          logger.info(
            `Successfully encoded video as MP4 DASH ${start.toNow()}`
          );
          resolve(mp4DashOutputPath);
        })
        .on("error", (err, stdout, stderr) => {
          logger.error(
            "An error occured during encoding: ",
            JSON.stringify(err)
          );
          logger.error(stdout);
          logger.error(stderr);
          reject(err);
        })
        .output(mp4DashOutputPath)
        .run();
    }).catch(e => {
      logger.error(JSON.stringify(e));
      throw e;
    });

    const writeStream = renderOutput.createWriteStream({
      contentType: "video/mp4",
      resumable: false
    });
    const mp4FileLocal = fs.createReadStream(mp4DashOutputPath);
    mp4FileLocal.pipe(
      writeStream,
      { end: true }
    );

    const mp4CreateInput: VideoUploadStorageLinkCreateInput = {
      path,
      bucket: process.env.VIDEO_PROCESSING_BUCKET,
      version: "WEB",
      fileType: "MP4_DASH",
      mimeType: "video/mp4",
      videoUpload: { connect: { id: master.videoUpload.id } }
    };

    return [mp4CreateInput, mp4DashOutputPath];
  }
  private async encodeMP4Dash(
    masterPath: string,
    master: VideoUploadStorageLink
  ): Promise<VideoUploadStorageLinkCreateInput[]> {
    const metadata = await this.getMetadata(masterPath);
    const maxHeight = Number(metadata.height);
    const fpsString = metadata.avg_frame_rate as string;
    const fps = Math.round(Number(math.eval(fpsString)));
    const audioTrack = await this.encodeAACAudio(masterPath, master);
    const audioTrackCreate = audioTrack[0];
    const audioTrackPath = audioTrack[1];
    const desiredMP4Formats: IMP4DashOption[] = [
      {
        fps,
        bitrate: "5300k",
        bufferSize: "2650k",
        height: 1080,
        scaleHeight: 1080
      },
      {
        fps,
        bitrate: "2400k",
        bufferSize: "1200k",
        height: 720,
        scaleHeight: 720
      },
      {
        fps,
        bitrate: "1060k",
        bufferSize: "530k",
        height: 480,
        scaleHeight: 478
      },
      {
        fps,
        bitrate: "600k",
        bufferSize: "300k",
        height: 360,
        scaleHeight: 360
      },
      {
        fps,
        bitrate: "260k",
        bufferSize: "130k",
        height: 240,
        scaleHeight: 242
      }
    ].filter(format => {
      return format.height <= maxHeight;
    });

    const dashLinkCreateInputs: VideoUploadStorageLinkCreateInput[] = [];
    const dashLocalPaths: string[] = [];
    for (const desiredFormat of desiredMP4Formats) {
      const dash = await this.encodeMP4DashWithOptions(
        masterPath,
        master,
        desiredFormat
      );
      dashLinkCreateInputs.push(dash[0]);
      dashLocalPaths.push(dash[1]);
    }

    const mp4DashInit = await this.generateMPD(
      dashLinkCreateInputs,
      dashLocalPaths,
      audioTrackPath
    );

    return [audioTrackCreate, ...dashLinkCreateInputs, ...mp4DashInit];
  }
  private async generateMPD(
    dashLinkCreateInputs: VideoUploadStorageLinkCreateInput[],
    dashLocalPaths: string[],
    audioTrackPath: string
  ): Promise<VideoUploadStorageLinkCreateInput[]> {
    const outputDir = directoryFromPath(dashLocalPaths[0]);
    const localMPDOutput = `"${outputDir}${filenameWithoutPathOrExtension(
      dashLocalPaths[0]
    )}-web.mpd"`;
    await new Promise((resolve, reject) => {
      dashLocalPaths.push(audioTrackPath);
      const fileArgs = dashLocalPaths
        .map(localPath => `"${localPath}"`)
        .join(" ");
      const cmdLineOpts = [
        "-dash 1000",
        "-rap",
        "-frag-rap",
        "-profile onDemand",
        `-out ${localMPDOutput} ${fileArgs}`
      ];
      logger.info(
        `Starting MP4Box with command: MP4Box ${cmdLineOpts.join(" ")}`
      );
      exec(
        `MP4Box ${cmdLineOpts.join(" ")}`,
        { silent: false },
        (code, stdout, stderr) => {
          if (code !== 0) {
            logger.error(code.toString());
            logger.error(stderr);
            return reject(stderr);
          }

          resolve();
        }
      );
    });

    const lsOutputDir = ls(outputDir).filter(filename => {
      return filename.indexOf("mpd") > 0 || filename.indexOf("dashinit") > 0;
    });

    const hasMPD = lsOutputDir.find(filename => filename.indexOf("mpd") > 0);

    if (!hasMPD) {
      const error = "No MPD file found. MP4Box command failed.";
      logger.error(error);
      throw new Error(error);
    }

    const fileLinkCreateInputs: VideoUploadStorageLinkCreateInput[] = [];
    const remoteDirectory = directoryFromPath(dashLinkCreateInputs[0].path);
    for (const fileToUpload of lsOutputDir) {
      const fileUploadLocalPath = `${outputDir}${fileToUpload}`;
      const isMPD = fileUploadLocalPath.indexOf(".mpd") > 0;
      const remoteFile = createFileInProcessing(remoteDirectory, fileToUpload);
      const contentType = isMPD ? "application/dash+xml" : "video/mp4";
      const writeStream = remoteFile.createWriteStream({ contentType });
      const localDashStream = fs.createReadStream(fileUploadLocalPath);

      const createInput: VideoUploadStorageLinkCreateInput = {
        path: remoteDirectory + fileToUpload,
        bucket: process.env.VIDEO_PROCESSING_BUCKET,
        version: "WEB",
        fileType: isMPD ? "MP4_DASH_MANIFEST" : "MP4_DASH",
        mimeType: contentType,
        videoUpload: dashLinkCreateInputs[0].videoUpload
      };

      localDashStream.pipe(
        writeStream,
        { end: true }
      );
      fileLinkCreateInputs.push(createInput);
    }

    logger.info(`Generated ${fileLinkCreateInputs.length} MPG DASH files.`);
    return fileLinkCreateInputs;
  }
  private async encodeWebM(
    master: VideoUploadStorageLink
  ): Promise<VideoUploadStorageLinkCreateInput[]> {
    const stage = await this.stageRender(master, "-web.webm");
    const {
      ffmpeg,
      renderOutput,
      masterLocalPath,
      path,
      start,
      inputFormat,
      renderEnd,
      renderStart
    } = stage;
    const writeStream = renderOutput.createWriteStream({
      contentType: "video/webm",
      resumable: false
    });
    await new Promise<File>((resolve, reject) => {
      ffmpeg
        .input(masterLocalPath)
        .inputFormat(inputFormat)
        .format("webm")
        .videoCodec("libvpx")
        .audioCodec("libvorbis")
        .outputOption(`-threads ${cpus().length}`)
        .outputOption("-quality good")
        .outputOption("-speed 0")
        .videoBitrate("1000")
        .seekInput(renderStart)
        .outputOptions(`-to ${renderEnd}`)
        .outputOptions("-qmin 0")
        .outputOptions("-qmax 25")
        .outputOptions("-map_metadata -1")
        .on("start", cmdLine => {
          logger.info("Started ffmpeg with command: " + cmdLine);
        })
        .on("end", () => {
          logger.info(`Successfully encoded video as Webm ${start.toNow()}`);
          resolve(renderOutput);
        })
        .on("error", (err, stdout, stderr) => {
          logger.error(
            "An error occured during encoding: ",
            JSON.stringify(err)
          );
          logger.error(stdout);
          logger.error(stderr);
          reject(err);
        })
        .pipe(
          writeStream,
          { end: true }
        );
    }).catch(e => {
      logger.error(JSON.stringify(e));
      throw e;
    });

    return [
      {
        path,
        bucket: process.env.VIDEO_PROCESSING_BUCKET,
        version: "WEB",
        fileType: "WEBM",
        mimeType: "video/webm",
        videoUpload: { connect: { id: master.videoUpload.id } }
      }
    ];
  }
  private async encodeAudio(
    master: VideoUploadStorageLink
  ): Promise<VideoUploadStorageLinkCreateInput[]> {
    const stage = await this.stageRender(master, "-web.flac");
    const {
      ffmpeg,
      renderOutput,
      masterLocalPath,
      path,
      start,
      inputFormat,
      renderEnd,
      renderStart
    } = stage;
    const flacOutputPath = `/tmp/ts-wtf/${directoryFromPath(
      master.path
    )}${filenameWithoutPathOrExtension(master.path)}.flac`;
    await new Promise<string>((resolve, reject) => {
      ffmpeg
        .input(masterLocalPath)
        .inputFormat(inputFormat)
        .seekInput(renderStart)
        .outputOptions(`-to ${renderEnd}`)
        .noVideo()
        .format("flac")
        .audioChannels(1)
        .output(flacOutputPath)
        .on("start", cmdLine => {
          logger.info("Started ffmpeg with command: " + cmdLine);
        })
        .on("end", () => {
          logger.info(`Successfully encoded audio as flac ${start.toNow()}`);
          resolve(masterLocalPath);
        })
        .on("error", (err, stdout, stderr) => {
          logger.error(
            "An error occured during encoding: ",
            JSON.stringify(err)
          );
          logger.error(stdout);
          logger.error(stderr);
          reject(err);
        })
        .run();
    }).catch(e => {
      logger.error(JSON.stringify(e));
      throw e;
    });

    const writeStream = renderOutput.createWriteStream({
      contentType: "audio/flac"
    });
    const flacFileLocal = fs.createReadStream(flacOutputPath);
    flacFileLocal.pipe(
      writeStream,
      { end: true }
    );

    return [
      {
        path,
        bucket: process.env.VIDEO_PROCESSING_BUCKET,
        version: "WEB",
        mimeType: "audio/flac",
        fileType: "AUDIO",
        videoUpload: { connect: { id: master.videoUpload.id } }
      }
    ];
  }
  private async transcodeToMP4(
    master: VideoUploadStorageLink
  ): Promise<VideoUploadStorageLinkCreateInput[]> {
    return this.encodeMP4(master);
  }
  private async transcodeToWebM(
    master: VideoUploadStorageLink
  ): Promise<VideoUploadStorageLinkCreateInput[]> {
    return this.encodeWebM(master);
  }
  private async transcodeToAudio(
    master: VideoUploadStorageLink
  ): Promise<VideoUploadStorageLinkCreateInput[]> {
    return this.encodeAudio(master);
  }
}
