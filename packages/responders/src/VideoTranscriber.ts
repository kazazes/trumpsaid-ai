import {
  getFileSize,
  getReadStream,
  logger,
  writeVideoUploadLog
} from "@trumpsaid/common";
import {
  ConversationBlockCreateInput,
  prismaContext,
  VideoConversationCreateInput,
  VideoUpload,
  VideoUploadStorageLink
} from "@trumpsaid/prisma";
import { findIndex, slice, take } from "lodash";
import Long from "long";
import moment from "moment";
// tslint:disable-next-line:no-submodule-imports
import * as mm from "music-metadata/lib";

// tslint:disable-next-line:no-var-requires
const speech = require("@google-cloud/speech").v1p1beta1;

const client = new speech.SpeechClient({
  projectId: process.env.GOOGLE_PROJECT_ID
});

export default class VideoTranscriber {
  public uri: string;
  public sampleRateHertz: number;
  public flacLink: VideoUploadStorageLink;
  public video: VideoUpload;
  public videoID: string;
  constructor(video: VideoUpload) {
    this.videoID = video.id;
  }

  public async recognize() {
    this.video = await prismaContext.query.videoUpload(
      { where: { id: this.videoID } },
      " { id storageLinks { id version fileType bucket path } metadata { id speakers conversations { id } } } "
    );
    this.flacLink = this.video.storageLinks.find(
      link => link.version === "WEB" && link.fileType === "AUDIO"
    );
    if (!this.flacLink) {
      const err = `Transcriber was passed an upload without a FLAC link.`;
      logger.error(err);
      writeVideoUploadLog(this.video, "FAILED", "TRANSCRIPTION", err);
      throw new Error(err);
    }
    this.uri = `gs://${this.flacLink.bucket}/${this.flacLink.path}`;
    logger.info(`Starting transcription job for ${this.video.id}.`);
    writeVideoUploadLog(
      this.video,
      "STARTED",
      "TRANSCRIPTION",
      null,
      moment().add(30, "minutes")
    );

    const audioReadStream = getReadStream(this.flacLink);
    const audioFileSize = await getFileSize(this.flacLink);

    const metadata = await mm.parseStream(audioReadStream, "audio/flac", {
      duration: false,
      skipCovers: true,
      fileSize: audioFileSize,
      skipPostHeaders: true
    });

    audioReadStream.destroy();

    logger.silly(
      `Audio of video ${this.video.id} metadata:\n ${JSON.stringify(
        metadata,
        null,
        2
      )}`
    );
    logger.info(`Dispatching transcription job for ${this.video.id}.`);

    const speechApiConfig = {
      encoding: "FLAC",
      languageCode: "en-US",
      enableSpeakerDiarization: true,
      model: "video",
      sampleRateHertz: metadata.format.sampleRate,
      enableAutomaticPunctuation: true,
      useEnhanced: true,
      enableWordTimeOffsets: true,
      enableWordConfidence: true,
      diarizationSpeakerCount: this.video.metadata.speakers,
      metadata: {
        interactionType: 1, // "Discussion" https://cloud.google.com/nodejs/docs/reference/speech/2.0.x/google.cloud.speech.v1p1beta1#.InteractionType
        industryNaicsCodeOfAudio: 813940, // Political orgs. https://www.naics.com/naics-code-description/?code=813940
        originalMediaType: 2 // Video https://cloud.google.com/nodejs/docs/reference/speech/2.0.x/google.cloud.speech.v1p1beta1#.OriginalMediaType
      }
    };

    const clientData = await client.longRunningRecognize({
      config: speechApiConfig,
      audio: { uri: this.uri }
    });

    const fullData = await clientData[0].promise();

    const response = fullData[0] as ILongRunningRecognizeResponse;
    const lastResult = response.results[response.results.length - 1]; // Last result is the most complete
    if (!lastResult.alternatives[0]) {
      // no transcription returned
      await this.storeConversation([]);
      logger.warn(
        `No transcription received back for ${
          this.video.id
        }, setting an empty one.`
      );
    } else {
      const lastWords = lastResult.alternatives[0].words;
      const conversation = this.wordsToConversation(lastWords);
      await this.storeConversation(conversation);
      writeVideoUploadLog(this.video, "FINISHED", "TRANSCRIPTION");
      logger.info(`Set GC Speech API conversation on video ${this.video.id}`);
    }
  }

  private async storeConversation(apiConversation: IWord[][]) {
    const mappedBlocks: ConversationBlockCreateInput[] = [];

    apiConversation.map(rawBlock => {
      const content = rawBlock.map(word => word.word).join(" ");

      const blockCreateInput: ConversationBlockCreateInput = {
        content,
        start:
          rawBlock[0].startTime.seconds.toNumber() +
          rawBlock[0].startTime.nanos / 1000000000,
        end:
          rawBlock[rawBlock.length - 1].endTime.seconds.toNumber() +
          rawBlock[rawBlock.length - 1].endTime.nanos / 1000000000,
        speaker: undefined
      };

      mappedBlocks.push(blockCreateInput);
    });

    const mappedConversation: VideoConversationCreateInput = {
      blocks: { create: mappedBlocks }
    };

    return prismaContext.mutation.updateVideoUploadMetadata({
      where: { id: this.video.metadata.id },
      data: { conversations: { create: mappedConversation } }
    });
  }

  private wordsToConversation(words: IWord[]) {
    let mutableWords = words;
    const conversation: IWord[][] = [];
    while (mutableWords.length > 0) {
      const speaker = mutableWords[0].speakerTag;
      let end = findIndex(mutableWords, word => {
        return word.speakerTag !== speaker;
      });

      if (end === -1) {
        end = mutableWords.length;
      }

      const chunk = take(mutableWords, end);
      conversation.push(chunk);

      mutableWords = slice(mutableWords, end);
    }
    return conversation;
  }
}

interface IStartTime {
  nanos: number;
  seconds: Long;
}

interface IEndTime {
  nanos: number;
  seconds: Long;
}

interface IWord {
  startTime: IStartTime;
  endTime: IEndTime;
  word: string;
  speakerTag: number;
}

interface IAlternative {
  transcript: string;
  confidence: number;
  words: IWord[];
}

interface IResult {
  alternatives: IAlternative[];
}

interface ILongRunningRecognizeResponse {
  results: IResult[];
}
