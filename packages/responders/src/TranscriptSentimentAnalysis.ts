import { logger } from '@trumpsaid/common';

// USE AN MQ

// tslint:disable-next-line:no-var-requires
const language = require('@google-cloud/language');

export class TranscriptSentimentAnalysis {
  private client: any;
  constructor() {
    this.client = language.v1.LanguageServiceClient({
      projectId: process.env.GOOGLE_PROJECT_ID
    });
  }

  public analyzeEntitySentimentOfText(text: string) {
    const document: ILanguageDocument = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    // Detects sentiment of entities in the document
    this.client
      .analyzeEntitySentiment({ document })
      .then((results: any) => {
        const entities: IEntity[] = results[0].entities;

        logger.debug(`Entities and sentiments:`);
        entities.forEach(entity => {
          logger.debug(`  Name: ${entity.name}`);
          logger.debug(`  Type: ${entity.type}`);
          logger.debug(`  Score: ${entity.sentiment.score}`);
          logger.debug(`  Magnitude: ${entity.sentiment.magnitude}`);
        });
      })
      .catch((err: any) => {
        logger.error('ERROR:', err);
      });
  }
}

interface ILanguageDocument {
  content: string;
  type: string;
}

// https://cloud.google.com/nodejs/docs/reference/language/1.2.x/google.cloud.language.v1#.TextSpan
interface ITextSpan {
  content: string;
  beginOffset: number;
}

// https://cloud.google.com/nodejs/docs/reference/language/1.2.x/google.cloud.language.v1#.Sentiment
interface ISentiment {
  magnitude: number;
  score: number;  
}

// https://cloud.google.com/nodejs/docs/reference/language/1.2.x/google.cloud.language.v1#.EntityMention
interface IEntityMention {
  text: ITextSpan;
  type: number;
  sentiment: ISentiment;
}

// https://cloud.google.com/nodejs/docs/reference/language/1.2.x/google.cloud.language.v1.html#.Entity
interface IEntity {
  name: string;
  type: number;
  metadata: IEntityMetadata;
  salience: number;
  mentions: IEntityMention[];
  sentiment: ISentiment;
}

interface IEntityMetadata {
  wikipedia_url?: string;
  mid?: string;
}
