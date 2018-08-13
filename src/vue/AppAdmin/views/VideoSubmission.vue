<template>
  <div class="wrapper">
    <b-nav style="margin: -1.5rem -1.9rem; padding: 0 1.5rem;" class="mb-4 bg-light">
      <div class="my-2 mx-2">
        <b-btn size="sm" @click="deleteUpload" variant="outline-danger"><i class="icon icon-trash"></i>&nbsp;Delete Upload</b-btn>
      </div>
    </b-nav>
    <div class="animated fadeIn">
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
      <b-card v-else-if="awaitingTranscription" class="text-center">
        <h5>Doing some magic...</h5>
        <Spinner></Spinner>
      </b-card>
      <div v-else-if="awaitingTranscriptionReview" style="margin: -1.5rem -30px 0 -30px" class="bg-white">
        <VideoTranscriptEditor :videoUpload="videoUpload"></VideoTranscriptEditor>
      </div>
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
import VideoTranscriptEditor from './VideoTranscriptEditor.vue';

// tslint:disable-next-line:variable-name
const Spinner = require('vue-simple-spinner');

export default Vue.extend({
  name: 'VideoSubmission',
  components: {
    Spinner,
    VideoSubmissionInitialMetadata,
    VideoTranscriptEditor,
  },
  data: () => {
    return {
      videoUpload: { storageLinks: [], metadata: { conversations: [{ createdBy: null }] } },
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
      get() {
        return this.videoUpload.metadata.conversations.length === 0;
      },
    },
    awaitingTranscriptionReview: {
      get() {
        const firstConvo = this.videoUpload.metadata.conversations[0];
        return !this.awaitingTranscription && firstConvo !== undefined && firstConvo.createdBy === null;
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
