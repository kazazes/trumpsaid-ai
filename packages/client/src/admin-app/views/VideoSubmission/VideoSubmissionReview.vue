<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <router-view />
      <div v-if="videoUpload !== undefined">
        <b-card title="Metadata">
          <VideoSubmissionNLP :video-upload="videoUpload" />
          <VideoSubmissionMetadata :video-upload="videoUpload" />
        </b-card>
        <b-card title="News Sources">
          <VideoSubbmissionNewsSources :video-upload="videoUpload" />
        </b-card>
        <b-card title="Transcript">
          <VideoTranscriptEditor :video-upload="videoUpload" />
        </b-card>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { VIDEO_UPLOAD_DETAILS } from '../../constants/graphql';
  import VideoSubmissionMetadata from './VideoSubmissionMetadata.vue';
  import VideoSubbmissionNewsSources from './VideoSubmissionNewsSources.vue';
  import VideoTranscriptEditor from './VideoTranscriptEditor.vue';
  import VideoSubmissionNLP from './VideoSubmissionNLP.vue';

  @Component({
    name: 'VideoSubmissionReview',
    components: {
      VideoSubmissionMetadata,
      VideoSubbmissionNewsSources,
      VideoTranscriptEditor,
      VideoSubmissionNLP,
    },
    apollo: {
      videoUpload: {
        query: VIDEO_UPLOAD_DETAILS,
        variables() {
          return {
            videoSubmissionId: this.$route.params.submissionId,
          };
        },
        pollInterval: 1000,
      },
    },
  })
  export default class VideoSubmissionReview extends Vue {}
</script>
