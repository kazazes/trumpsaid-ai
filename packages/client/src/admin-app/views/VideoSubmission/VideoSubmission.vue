<template>
  <div class="wrapper">
    <b-nav style="margin: -1.5rem -1.9rem; padding: 0 1.5rem;" class="mb-4 bg-light">
      <div class="my-2 mx-2">
        <b-btn v-if="readyForReview" size="sm" variant="success" @click="submitForApproval">
          Publish
        </b-btn>
        <b-btn size="sm" variant="outline-danger" @click="deleteUpload">
          <i class="icon icon-trash" />&nbsp;Delete
        </b-btn>
      </div>
    </b-nav>
    <div class="animated fadeIn">
      <b-col v-if="loading">
        <Spinner />
      </b-col>
      <b-card v-else-if="isDownloading" class="text-center">
        <h5>Downloading...</h5>
        <Spinner />
      </b-card>
      <b-card v-else-if="needsInitialMetadata" header="Raw video">
        <VideoSubmissionInitialMetadata :video-upload="videoUpload" />
      </b-card>
      <b-card v-else-if="awaitingTranscription" class="text-center">
        <h5>Doing some magic...</h5>
        <Spinner />
      </b-card>
      <div v-else-if="awaitingTranscriptionReview" style="margin: -1.5rem -30px 0 -30px" class="bg-white">
        <VideoTranscriptEditor :video-upload="videoUpload" />
      </div>
      <div v-else-if="readyForReview">
        <VideoSubmissionReview :video-upload="videoUpload" />
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
  import {
    VideoUpload,
    VideoUploadStorageLink,
    VideoConversation,
  } from '@trumpsaid/prisma';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {
    DELETE_VIDEO_UPLOAD,
    VIDEO_UPLOAD_DETAILS,
    PUBLISH_UPLOAD,
  } from '../../constants/graphql';
  import VideoSubmissionInitialMetadata from './VideoSubmissionInitialMetadata.vue';
  import VideoTranscriptEditor from './VideoTranscriptEditor.vue';
  import VideoSubmissionReview from './VideoSubmissionReview.vue';

  // tslint:disable-next-line:no-var-requires variable-name
  const Spinner = require('vue-simple-spinner');

  @Component({
    name: 'VideoSubmission',
    components: {
      Spinner,
      VideoSubmissionInitialMetadata,
      VideoTranscriptEditor,
      VideoSubmissionReview,
    },
    apollo: {
      videoUpload: {
        query: VIDEO_UPLOAD_DETAILS,
        variables(): any {
          return { videoSubmissionId: this.$route.params.submissionId };
        },
        pollInterval: 1000,
      },
    },
  })
  export default class VideoSubmission extends Vue {
    public videoUpload: VideoUpload;
    public selectThumbnailDisabled: boolean = false;
    public loading: boolean = false;

    protected async submitForApproval() {
      const { title, subtitle, dateRecorded } = this.videoUpload.metadata;
      if (title === null || subtitle === null || dateRecorded === null) {
        return this.$notify({
          type: 'warn',
          title:
            'Title, subtitle and date recorded are required. Did you save them?',
        });
      }

      await this.$apollo.mutate({
        mutation: PUBLISH_UPLOAD,
        variables: {
          videoId: this.videoUpload.id,
        },
      });

      return this.$notify({
        type: 'success',
        title: 'Published!',
      });
    }

    protected async deleteUpload() {
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
      return (
        this.videoUpload !== undefined &&
        this.videoUpload.metadata.renderEnd === 0
      );
    }

    get mp4Master() {
      if (this.videoUpload === undefined) {
        return undefined;
      }
      return this.videoUpload.storageLinks.find(
        (link: VideoUploadStorageLink) => {
          return link.version === 'MASTER' && link.fileType === 'MP4';
        },
      );
    }

    get mp4Web() {
      if (this.videoUpload === undefined) {
        return undefined;
      }
      return this.videoUpload.storageLinks.find(
        (link: VideoUploadStorageLink) => {
          return link.version === 'WEB' && link.fileType === 'MP4';
        },
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
        return false;
      }

      const userCreatedConversation = this.videoUpload.metadata.conversations.findIndex(
        (convo: VideoConversation) => {
          return convo.createdBy !== null;
        },
      );

      const firstConvo = this.videoUpload.metadata.conversations[0];

      return (
        !this.awaitingTranscription &&
        userCreatedConversation === -1 &&
        firstConvo !== undefined &&
        firstConvo.createdBy === null
      );
    }

    get readyForReview() {
      if (this.videoUpload === undefined) {
        return false;
      }

      const userCreatedConversation = this.videoUpload.metadata.conversations.findIndex(
        (convo: VideoConversation) => {
          return convo.createdBy !== null;
        },
      );

      if (this.videoUpload !== undefined && userCreatedConversation !== -1) {
        return true;
      }

      return false;
    }
  }
</script>
