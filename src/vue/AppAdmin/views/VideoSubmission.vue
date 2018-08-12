<template>
  <div class="wrapper">
    <b-nav style="margin: -1.5rem -1.9rem; padding: 0 1.5rem;" class="mb-4 bg-light">
      <div class="my-2 mx-2">
        <b-btn @click="deleteUpload">Delete Upload</b-btn>
      </div>
    </b-nav>
    <div class="animated fadeIn">
      <b-card no-body header="Video Processing">
        <b-list-group flush>
          <b-list-group-item :variant="isDownloading ? 'primary': 'success'">
            <div class="d-flex align-items-center">
              <span>1.&nbsp;</span>
              <span class="mr-4">Wait for the submited video to download.</span>
            </div>
          </b-list-group-item>
          <b-list-group-item :variant="needsInitialMetadata && !isDownloading ? 'info' : 'success'">
            <div class="d-flex align-items-center ">
              <span>2.&nbsp;</span>
              <span class="mr-4">Give me some details.</span>
            </div>
          </b-list-group-item>
          <b-list-group-item :variant="awaitingTranscription ? 'info' : 'success'">
            <div class="d-flex align-items-center ">
              <span>3.&nbsp;</span>
              <span class="mr-4">Give me a second to work some magic...</span>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-col v-if="loading">
        <Spinner></Spinner>
      </b-col>
      <b-card v-else-if="isDownloading" class="text-center">
        <h5>Downloading...</h5>
        <Spinner></Spinner>
      </b-card>
      <b-card v-else-if="needsInitialMetadata" header="Raw video">
        <VideoSubmissionInitialMetadata :videoUpload="videoUpload"></VideoSubmissionInitialMetadata>
      </b-card>
      <b-row>
        <b-col sm="12" class="text-center mb-2">
          <b-button v-b-toggle.debug-info>Toggle Debug Info</b-button>
        </b-col>
        <b-collapse id="debug-info" class="mt-2">
          <b-card header="Debug Info" header-tag="header">
            <pre>{{ formatedUpload }}</pre>
          </b-card>
        </b-collapse>
      </b-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { VideoUploadStorageLink } from '../../../graphql/generated/prisma';
import { DELETE_VIDEO_UPLOAD, VIDEO_UPLOAD_DETAILS } from '../constants/graphql.ts';
import VideoSubmissionInitialMetadata from './VideoSubmissionInitialMetadata.vue';

// tslint:disable-next-line:variable-name
const Spinner = require('vue-simple-spinner');

export default Vue.extend({
  name: 'VideoSubmission',
  components: {
    Spinner,
    VideoSubmissionInitialMetadata,
  },
  data: () => {
    return {
      videoUpload: { storageLinks: [], metadata: { conversations: [] } },
      selectThumbnailDisabled: false,
      loading: this.isDownloading || this.awaitingTranscription,
    };
  },
  methods: {
    async deleteUpload() {
      if (window.confirm('Are you you want to delete this video?')) {
        await this.$apollo.mutate({
          mutation: DELETE_VIDEO_UPLOAD,
          variables: {
            id: this.videoUpload.id,
          },
        });

        this.$notify({
          type: 'danger',
          title: 'Video deleted',
        });

        this.$router.push('/videos/submissions/all');
      }
    },
  },
  computed: {
    formatedUpload: {
      get() {
        return JSON.stringify(this.videoUpload, null, 2);
      },
    },
    isDownloading:{
      get() {
        return this.firstMaster === undefined;
      },
    },
    needsInitialMetadata:{
      get() {
        return this.videoUpload.metadata.renderEnd === 0;
      },
    },
    firstMaster: {
      get() {
        return this.videoUpload.storageLinks.find(
        (link: VideoUploadStorageLink) => { return link.version === 'MASTER' && (link.fileType === 'MP4' || link.fileType === 'WEBM'); });
      },
    },
    awaitingTranscription: {
      get(){
        return this.videoUpload.metadata.conversations.length === 0;
      },
    },
    awaitingTranscriptionReview: {
      get(){
        return this.videoUpload.metadata.conversations.length === 0;
      },
    },
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
