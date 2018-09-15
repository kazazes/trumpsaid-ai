import { ConversationBlock, EntityType, prismaContext, VideoConversation } from '@trumpsaid/prisma';
import { str as hash } from 'crc-32';
import { concat, zip } from 'lodash';

// tslint:disable-next-line:no-var-requires
const language = require('@google-cloud/language');

export default class TranscriptNLP {

  private client: any;
  constructor() {
    this.client = new language.v1.LanguageServiceClient({
      projectId: process.env.GOOGLE_PROJECT_ID,
    });
  }

  public async augmentTranscriptWithNLP(transcript: VideoConversation) {
    const analysisRequests = transcript.blocks.map((block) => {
      return this.analyzeEntitySentimentOfText(block.content);
    });

    const analysis = await Promise.all(analysisRequests) as any[][];

    const blockAnalysis = zip(transcript.blocks, analysis)
      .map((zipBlock) => {
        return [zipBlock[0], zipBlock[1][0] as IEntitySentimentResponse];
      });

    const entityUpserts = blockAnalysis.map((zipBlock) => {
      const nlp = zipBlock[1] as IEntitySentimentResponse;

      return nlp.entities.map((entity) => {
        const entityHash = hash(entity.name + entity.type + entity.metadata.mid);
        return prismaContext.mutation.upsertEntity({
          where: { hash: entityHash },
          create: {
            hash: entityHash,
            googleMetadataId: entity.metadata.mid,
            name: entity.name,
            type: entity.type,
            wikipediaURL: entity.metadata.wikipedia_url,
          },
          update: {},
        });
      });
    });

    await Promise.all(concat(entityUpserts));

    const entityMentionInputs = blockAnalysis.map((zipBlock) => {
      const block = zipBlock[0] as ConversationBlock;
      const nlp = zipBlock[1] as IEntitySentimentResponse;

      return nlp.entities.map((entity) => {
        const entityHash = hash(entity.name + entity.type + entity.metadata.mid);
        return prismaContext.mutation.createEntityMention({
          data: {
            conversationBlock: { connect: { id: block.id } },
            entity: { connect: { hash: entityHash } },
            salience: entity.salience,
            sentiment: entity.sentiment.score,
            sentimentMagnitude: entity.sentiment.magnitude,
          },
        });
      });
    });

    return concat(entityMentionInputs);
  }

  public async analyzeEntitySentimentOfText(text: string) {
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    return this.client.analyzeEntitySentiment({ document });
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
  type: EntityType;
  metadata: IEntityMetadata;
  salience: number;
  mentions: IEntityMention[];
  sentiment: ISentiment;
}

export interface IEntityMetadata {
  wikipedia_url?: string;
  mid?: string;
}

export interface IEntitySentimentResponse {
  entities: IEntity[];
  language?: string;
}
