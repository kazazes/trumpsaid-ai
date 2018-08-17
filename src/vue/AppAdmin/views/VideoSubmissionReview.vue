<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <router-view></router-view>
      <b-card no-body>
        <b-tabs card pills>
          <b-tab title="Metadata" active>
            <VideoSubmissionMetadata v-if="videoUpload !== undefined" :videoUpload="videoUpload"></VideoSubmissionMetadata>
          </b-tab>
          <b-tab title="News Sources">
            <VideoSubbmissionNewsSources v-if="videoUpload !== undefined" :videoUpload="videoUpload"></VideoSubbmissionNewsSources>
          </b-tab>
          <b-tab title="Files">

          </b-tab>
          <b-tab title="Transcript" >

          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>
<style>
</style>
<script lang="ts">
import Vue from 'vue';
import { VIDEO_UPLOAD_DETAILS } from '../constants/graphql.ts';
import VideoSubmissionMetadata from './VideoSubmissionMetadata.vue';
import VideoSubbmissionNewsSources from './VideoSubmissionNewsSources.vue';

export default Vue.extend({
  name: 'VideoSubmissionReview',
  components: {
    VideoSubmissionMetadata,
    VideoSubbmissionNewsSources,
  },
  data() {
    return {

    };
  },
  computed: {
  },
  mounted() {

  },
  updated() {
  },
  props: {
  },
  filters: {
  },
  methods: {
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
});
</script>
