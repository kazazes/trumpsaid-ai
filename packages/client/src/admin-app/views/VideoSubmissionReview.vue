<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <router-view />
      <b-card no-body>
        <b-tabs card pills>
          <b-tab title="Metadata" active>
            <VideoSubmissionMetadata v-if="videoUpload !== undefined" :video-upload="videoUpload" />
          </b-tab>
          <b-tab title="News Sources">
            <VideoSubbmissionNewsSources v-if="videoUpload !== undefined" :video-upload="videoUpload" />
          </b-tab>
          <b-tab title="Files" />
          <b-tab title="Transcript" />
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>
<style>
</style>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { VIDEO_UPLOAD_DETAILS } from '../constants/graphql';
  import VideoSubmissionMetadata from './VideoSubmissionMetadata.vue';
  import VideoSubbmissionNewsSources from './VideoSubmissionNewsSources.vue';

  @Component({
    name: 'VideoSubmissionReview',
    components: {
      VideoSubmissionMetadata,
      VideoSubbmissionNewsSources,
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
  export default class VideoSubmissionReview extends Vue { }
</script>
