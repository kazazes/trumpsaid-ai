import {
  ConversationBlockCreateInput,
  ConversationBlockCreateManyInput,
  Speaker,
  SpeakerCreateInput,
} from '@trumpsaid/prisma';
import { TranscriptNLP } from '@trumpsaid/web-workers';
import { ApolloError } from 'apollo-server-errors';
import { uniqBy } from 'lodash';

import { IApolloContext } from '../../apollo';

export default {
  createConversation: async (obj: any, args: any, ctx: IApolloContext, info: any) => {
    const videoId = args.videoId;
    let upload = await ctx.db.query.videoUpload({ where: { id: videoId } }, '{ id metadata { id } }');
    const blocks: ConversationBlockCreateManyInput = { create: args.blocks };
    const speakers: SpeakerCreateInput[] = args.blocks.map((block: ConversationBlockCreateInput) => block.speaker.connect);
    const uniqueSpeakers: SpeakerCreateInput[] = uniqBy(speakers, 'name');

    await Promise.all(uniqueSpeakers.map((speaker: Speaker) => {
      return ctx.db.mutation.upsertSpeaker(
      { where: { name: speaker.name }, create: { name: speaker.name }, update: { } });
    }));

    try {
      await ctx.db.mutation.updateVideoUploadMetadata(
        { where : { id: upload.metadata.id },
          data: {
            conversations: {
              create: {
                blocks,
                createdBy: { connect: { id: ctx.user.id } },
                videoMetadata: { connect: { id: upload.metadata.id } },
                draft: true,
              },
            },
          },
        });
    } catch(e) {
      return new ApolloError('There was an error creating the conversation: ', e);
    }

    upload = await ctx.db.query.videoUpload({ where: { id: videoId } }, '{ id metadata { id conversations { id createdBy { id } } } }');
    const transcript = await ctx.db.query.videoConversations(
      {
        where: {
          videoMetadata: { id: upload.metadata.id },
        },
        orderBy: 'createdAt_DESC',
        first: 1 },
      '{ id blocks { id speaker { id name } start end content }}');

    new TranscriptNLP().augmentTranscriptWithNLP(transcript[0]);

    return upload;
  },
};
