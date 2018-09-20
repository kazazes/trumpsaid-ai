<template>
  <div class="my-1">
    <span>Tags: </span>
    <span class="badge badge-primary mx-1" v-for="mention in entities" :key="mention.entity.id">
      {{ mention.entity.name }}
    </span>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { VideoUpload, VideoConversation } from '@trumpsaid/prisma';
  import moment from 'moment';
  import { flatMap } from 'lodash';

  @Component({
    name: 'VideoSubmissionNLP',
    props: {
      videoUpload: Object as () => VideoUpload,
    },
    computed: {
      entities: function() {
        const entities = flatMap(
          (this.currentTranscript as VideoConversation).blocks,
          (block) => {
            return block.entityMentions;
          },
        ).filter((mention) => {
          return mention.entity.type !== 'OTHER';
        });
        return entities;
      },
      currentTranscript: function(): VideoConversation {
        const sortedTranscripts = this.videoUpload.metadata.conversations.sort(
          (convoA, convoB) => {
            return (
              moment(convoA.createdAt).milliseconds() -
              moment(convoB.createdAt).milliseconds()
            );
          },
        );

        return sortedTranscripts[0];
      },
    },
  })
  export default class VideoSubmissionNLP extends Vue {}
</script>
