import * as mm from 'music-metadata';
import { VideoStorageLink, VideoUpload } from '../../graphql/generated/prisma';
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

    const config = {
      encoding: 'FLAC',
      languageCode: 'en-US',
      enableSpeakerDiarization: true,
      model: 'video',
      sampleRateHertz: metadata.format.sampleRate,
      enableAutomaticPunctuation: true,
      useEnhanced: true,
      metadata: {
        interactionType: 1, // Discussion https://cloud.google.com/nodejs/docs/reference/speech/2.0.x/google.cloud.speech.v1p1beta1#.InteractionType
        industryNaicsCodeOfAudio: 813940, // Political orgs. https://www.naics.com/naics-code-description/?code=813940
        originalMediaType: 2, // Video https://cloud.google.com/nodejs/docs/reference/speech/2.0.x/google.cloud.speech.v1p1beta1#.OriginalMediaType
      },
    };

    client.longRunningRecognize({
      config,
      audio: { uri: this.uri },
    }).then((data: [any]) => {
      const operation = data[0];
      return operation.promise();
    })
      .then((data: [any]) => {
        const response = data[0] as ILongRunningRecognizeResponse;
        const transcription = response.results
          .map((result: any) => result.alternatives[0].transcript)
          .join('\n');
        logger.debug(`Transcription: ${transcription}`);
      })
      .catch((err: any) => {
        logger.error('ERROR:', err);
      });
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
