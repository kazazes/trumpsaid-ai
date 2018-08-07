import { findIndex, slice, take } from 'lodash';
import * as mm from 'music-metadata';
import {
  SpeechAPIConversation, SpeechAPIConversationBlockCreateInput,
  SpeechAPIConversationCreateInput, SpeechAPIWordCreateInput, VideoStorageLink, VideoUpload,
} from '../../graphql/generated/prisma';
import prisma from '../../graphql/prismaContext';
import logger from '../../util/logger';
import secrets from '../../util/secrets';
import { getFileSize, getReadStream } from '../storageController';

const speech = require('@google-cloud/speech').v1p1beta1;

const client = new speech.SpeechClient({
  projectId: secrets.GOOGLE_PROJECT_ID,
  keyFilename: 'gc-credentials.json',
});

export class VideoTranscriber {
  uri: string;
  sampleRateHertz: number;
  flacLink: VideoStorageLink;
  video: VideoUpload;
  speechAPIConversation: SpeechAPIConversation;
  constructor(video: VideoUpload) {
    this.video = video;
    this.flacLink = video.flacLink;
    this.uri = `gs://${this.flacLink.bucket}/${this.flacLink.path}`;
  }

  public async recognize() {
    const audioReadStream = getReadStream(this.flacLink);
    const audioFileSize = await getFileSize(this.flacLink);

    const metadata = await mm.parseStream(
      audioReadStream, 'audio/flac', { duration: false, skipCovers: true, fileSize: audioFileSize, skipPostHeaders: true });

    audioReadStream.destroy();

    // tslint:disable-next-line:no-magic-numbers
    logger.debug(`Audio of video ${this.video.id} metadata:\n ${JSON.stringify(metadata, null, 2)}`);
    logger.info(`Dispatching transcription job for ${this.video.id}.`);

    const speechApiConfig = {
      encoding: 'FLAC',
      languageCode: 'en-US',
      enableSpeakerDiarization: true,
      model: 'video',
      sampleRateHertz: metadata.format.sampleRate,
      enableAutomaticPunctuation: true,
      useEnhanced: true,
      enableWordTimeOffsets: true,
      enableWordConfidence: true,
      metadata: {
        interactionType: 1, // "Discussion" https://cloud.google.com/nodejs/docs/reference/speech/2.0.x/google.cloud.speech.v1p1beta1#.InteractionType
        industryNaicsCodeOfAudio: 813940, // Political orgs. https://www.naics.com/naics-code-description/?code=813940
        originalMediaType: 2, // Video https://cloud.google.com/nodejs/docs/reference/speech/2.0.x/google.cloud.speech.v1p1beta1#.OriginalMediaType
      },
    };

    const clientData = await client.longRunningRecognize({
      config: speechApiConfig,
      audio: { uri: this.uri },
    });

    const fullData = await clientData[0].promise();

    const response = fullData[0] as ILongRunningRecognizeResponse;
    // TODO: Store
    const lastResult = response.results[response.results.length - 1];
    const lastWords = lastResult.alternatives[0].words;
    const conversation = this.wordsToConversation(lastWords);
    this.speechAPIConversation = await this.storeConversation(conversation);
    logger.info(`Set GC Speech API conversation on video ${this.video.id}`);
  }

  private async storeConversation(conversation: IWord[][]) {
    const video = this.video;
    const conversationMappedToGraph: SpeechAPIConversationBlockCreateInput[] = conversation.map((rawBlock) => {
      const wordCreateInput: SpeechAPIWordCreateInput[] = rawBlock.map((word) => {
        return {
          video: { connect: { id: video.id } },
          startTime: word.startTime.nanos,
          endTime: word.endTime.nanos,
          word: word.word,
          speakerTag: word.speakerTag,
        };
      });

      const convoBlock: SpeechAPIConversationBlockCreateInput =
        { video: { connect: { id: video.id } }, speakerTag: rawBlock[0].speakerTag, words: { create: wordCreateInput } };
      return convoBlock;
    });

    const speechConversation: SpeechAPIConversationCreateInput = {
      video: { connect: { id: video.id } },
      conversation: { create: conversationMappedToGraph },
    };

    return prisma.mutation.createSpeechAPIConversation({ data: speechConversation });
  }

  private wordsToConversation(words: IWord[]) {
    let mutableWords = words;
    const conversation: IWord[][] = [];
    while (mutableWords.length > 0) {
      const speaker = mutableWords[0].speakerTag;
      let end = findIndex(mutableWords, (word) => {
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

export interface IStartTime {
  nanos: number;
  seconds: string;
}

export interface IEndTime {
  nanos: number;
  seconds: string;
}

export interface IWord {
  startTime: IStartTime;
  endTime: IEndTime;
  word: string;
  speakerTag: number;
}

export interface IAlternative {
  transcript: string;
  confidence: number;
  words: IWord[];
}

export interface IResult {
  alternatives: IAlternative[];
}

export interface ILongRunningRecognizeResponse {
  results: IResult[];
}
