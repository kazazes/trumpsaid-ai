import { uniqBy } from 'lodash';
import { IApolloContext } from '../../apollo';
import { ConversationBlockCreateInput, ConversationBlockCreateManyInput, Speaker, SpeakerCreateInput } from '../../generated/prisma';

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

    await ctx.db.mutation.updateVideoUploadMetadata(
      { where : { id: upload.metadata.id },
        data: {
          conversations: {
            create: {
              blocks,
              createdBy: { connect: { id: ctx.user.id } },
              draft: true,
            },
          },
        },
      });

    upload = await ctx.db.query.videoUpload({ where: { id: videoId } }, '{ id metadata { id conversations { id createdBy { id } } } }');

    return upload;
  },
};
