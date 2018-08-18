<template>
  <div class="wrapper">
    <b-nav
      style="margin: -1.5rem -1.9rem; padding: 0 1.5rem;"
      class="mb-4 bg-light"
    >
      <div class="my-2 mx-2">
        <b-btn
          size="sm"
          variant="outline-danger"
          @click="deleteUpload"
        ><i class="icon icon-trash" />&nbsp;Delete Upload</b-btn>
      </div>
    </b-nav>
    <div class="animated fadeIn">
      <b-col v-if="loading">
        <Spinner />
      </b-col>
      <b-card
        v-else-if="isDownloading"
        class="text-center"
      >
        <h5>Downloading...</h5>
        <Spinner />
      </b-card>
      <b-card
        v-else-if="needsInitialMetadata"
        header="Raw video"
      >
        <VideoSubmissionInitialMetadata :video-upload="videoUpload" />
      </b-card>
      <b-card
        v-else-if="awaitingTranscription"
        class="text-center"
      >
        <h5>Doing some magic...</h5>
        <Spinner />
      </b-card>
      <div
        v-else-if="awaitingTranscriptionReview"
        style="margin: -1.5rem -30px 0 -30px"
        class="bg-white"
      >
        <VideoTranscriptEditor :video-upload="videoUpload" />
      </div>
      <b-row>
        <b-col
          sm="12"
          class="text-center mb-2"
        >
          <b-button v-b-toggle.debug-info>Toggle Debug Info</b-button>
        </b-col>
        <b-collapse
          id="debug-info"
          class="mt-2"
        >
          <b-card
            header="Debug Info"
            header-tag="header"
          >
            <pre>{{ formatedUpload }}</pre>
          </b-card>
        </b-collapse>
      </b-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'Vue';
import {
  VideoUploadStorageLink,
  VideoUpload,
} from '../../../graphql/generated/prisma';
import { DELETE_VIDEO_UPLOAD, VIDEO_UPLOAD_DETAILS } from '../constants/graphql';
import VideoSubmissionInitialMetadata from './VideoSubmissionInitialMetadata.vue';
import VideoTranscriptEditor from './VideoTranscriptEditor.vue';
import Component from 'vue-class-component';

// tslint:disable-next-line:variable-name
const Spinner = require('vue-simple-spinner');

@Component({
  name: 'VideoSubmission',
  components: {
    Spinner,
    VideoSubmissionInitialMetadata,
    VideoTranscriptEditor,
  },
  apollo: {
    videoUpload: {
      query: VIDEO_UPLOAD_DETAILS,
      variables(): any {
        return { videoSubmissionId: this.$route.params.submissionId }
      },
      pollInterval: 1000,
    },
  }
})
export default class VideoSubmission extends Vue {
  videoUpload: VideoUpload;
  selectThumbnailDisabled: boolean = false;
  loading: boolean = false;

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
  }
  get formatedUpload() {
    return JSON.stringify(this.videoUpload, null, 2);
  }

  get isDownloading() {
    return this.videoUpload !== undefined && this.mp4Master === undefined;
  }

  get needsInitialMetadata() {
    return this.videoUpload !== undefined && this.videoUpload.metadata.renderEnd === 0;
  }

  get mp4Master() {
    if (this.videoUpload === undefined) return undefined;
    return this.videoUpload.storageLinks.find(
      (link: VideoUploadStorageLink) => {
        return link.version === 'MASTER' && link.fileType === 'MP4';
      }
    );
  }

  get mp4Web() {
    if (this.videoUpload === undefined) return undefined;
    return this.videoUpload.storageLinks.find(
      (link: VideoUploadStorageLink) => {
        return link.version === 'WEB' && link.fileType === 'MP4';
      }
    );
  }

  get awaitingTranscription() {
    return (
      this.videoUpload !== undefined &&
      (this.videoUpload.metadata.conversations.length === 0 ||
        this.mp4Web === undefined)
    );
  }

  get awaitingTranscriptionReview() {
    if (this.videoUpload === undefined) {
      return false
    }

    const firstConvo = this.videoUpload.metadata.conversations[0];
    return (
      !this.awaitingTranscription &&
      firstConvo !== undefined &&
      firstConvo.createdBy === null
    );
  }
}
</script>
