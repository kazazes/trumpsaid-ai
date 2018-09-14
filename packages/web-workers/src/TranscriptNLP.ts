import { logger } from '@trumpsaid/common';
import { VideoConversation } from '@trumpsaid/prisma';

// tslint:disable-next-line:no-var-requires
const language = require('@google-cloud/language');

export default class TranscriptNLP {
  private client: any;
  constructor() {
    this.client = language.v1.LanguageServiceClient({
      projectId: process.env.GOOGLE_PROJECT_ID,
    });
  }

  public async augmentTranscriptWithNLP(transcript: VideoConversation) {
    const analysis = transcript.blocks.map((block) => {
      return [block, this.analyzeEntitySentimentOfText(block.content)];
    });

    await Promise.all(analysis);
    logger.debug(`Entities and sentiment results: ${JSON.stringify(analysis, null, 2)}`);
  }

  public async analyzeEntitySentimentOfText(text: string) {
    const document: ILanguageDocument = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    const results: any = await this.client.analyzeEntitySentiment({ document });
    const entities: IEntity[] = results[0].entities;

    logger.debug('Entities and sentiments:');
    entities.forEach((entity) => {
      logger.debug(`  Name: ${entity.name}`);
      logger.debug(`  Type: ${entity.type}`);
      logger.debug(`  Score: ${entity.sentiment.score}`);
      logger.debug(`  Magnitude: ${entity.sentiment.magnitude}`);
    });

    return results;
  }
}

export interface ILanguageDocument {
  content: string;
  type: string;
}

// https://cloud.google.com/nodejs/docs/reference/language/1.2.x/google.cloud.language.v1#.TextSpan
export interface ITextSpan {
  content: string;
  beginOffset: number;
}

// https://cloud.google.com/nodejs/docs/reference/language/1.2.x/google.cloud.language.v1#.Sentiment
export interface ISentiment {
  magnitude: number;
  score: number;
}

// https://cloud.google.com/nodejs/docs/reference/language/1.2.x/google.cloud.language.v1#.EntityMention
export interface IEntityMention {
  text: ITextSpan;
  type: number;
  sentiment: ISentiment;
}

// https://cloud.google.com/nodejs/docs/reference/language/1.2.x/google.cloud.language.v1.html#.Entity
export interface IEntity {
  name: string;
  type: number;
  metadata: IEntityMetadata;
  salience: number;
  mentions: IEntityMention[];
  sentiment: ISentiment;
}

export interface IEntityMetadata {
  wikipedia_url?: string;
  mid?: string;
}
