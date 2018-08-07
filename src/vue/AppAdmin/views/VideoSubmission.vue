<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-card no-body header="Video Processing">
        <b-list-group flush>
          <b-list-group-item :variant="videoUpload.status == 'AWAITING_PROCESSING' ? 'info' : 'dark'">
            <div class="d-flex align-items-center">
              <span class="list-group-step-title">Step 1:</span>
              <span class="mr-4">Download. Review the submited video before initiating processing.</span>
              <div v-if="videoUpload.status === 'AWAITING_PROCESSING'">
                <b-button class="mr-4" :href="videoUpload.submitedUrl" target="_blank" variant="info">Review Video</b-button>
                <b-button class="mr-4" @click="startProcessing">Start Processing</b-button>
              </div>
            </div>
          </b-list-group-item>
          <b-list-group-item :variant="videoUpload.status == 'READY_TO_RENDER' ? 'info' : 'dark'">
            <div class="d-flex align-items-center ">
              <span class="list-group-step-title">Step 2:</span>
              <span>Render. Before rendering, verify that the video was downloaded correctly.</span>
            </div>
          </b-list-group-item>
          <b-list-group-item :variant="videoUpload.status == 'NEEDS_THUMBNAILS' ? 'info' : 'dark'">
            <div class="d-flex align-items-center ">
              <span class="list-group-step-title">Step 3:</span>
              <span>Choose thumbnail.</span>
            </div>
          </b-list-group-item>
          <b-list-group-item :variant="videoUpload.status === 'NEEDS_REVIEW' ? 'info' : 'dark'">
            <div class="d-flex align-items-center ">
              <span class="list-group-step-title">Step 4:</span>
              <span>Review the output videos and thumbnail.</span>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-col v-if="$apollo.loading || loading">
        <Spinner></Spinner>
      </b-col>
      <b-card v-else-if="videoUpload.status === 'DOWNLOADING'" class="text-center">
        <h5>Downloading...</h5>
        <Spinner></Spinner>
      </b-card>
      <b-card v-else-if="videoUpload.status === 'READY_TO_RENDER'" header="Raw video">
        <b-row>
          <b-col md="6">
            <VideoPlayer id="rawVideoDownload" :sources="getSource(videoUpload.rawStorageLink)" preload="auto" data-setup="{}"></VideoPlayer>
          </b-col>
          <b-col md="6" class="text-center">
            <p v-if="videoUpload.state === 'PENDING'">Before publishing, the video must be rendered for the web. Confirm the video was downloaded correctly before rendering.</p>
            <p v-else-if="videoUpload.state === 'PROCESSING'">Video is rendering, this will take a while.</p>
            <div class="text-center mt-5">
              <b-button v-if="videoUpload.state === 'PENDING'" @click="startProcessing()">Render Video</b-button>
              <Spinner v-else-if="videoUpload.state === 'PROCESSING'"></Spinner>
            </div>
          </b-col>
        </b-row>
      </b-card>
      <b-card v-else-if="videoUpload.status === 'NEEDS_THUMBNAILS'">
        <b-row>
          <b-col md="6">
            <VideoPlayer id="rawVideo" :sources="getSource(videoUpload.rawStorageLink)" preload="auto" data-setup="{}"></VideoPlayer>
          </b-col>
          <b-col md="6" class="text-center">
            <p>Find a thumbnail frame, pause, then process.</p>
            <b-button @click="selectThumbnail" id="select-thumbnail" :disabled="selectThumbnailDisabled">Use frame as thumbnail</b-button>
          </b-col>
        </b-row>
      </b-card>
      <b-card v-else-if="videoUpload.status === 'NEEDS_REVIEW'">
        <b-row>
          <b-col md="6">
            <h5>MP4 Version</h5>
            <VideoPlayer id="mp4Video" :sources="getSource(videoUpload.mp4Link)" :poster="getPoster(videoUpload)" preload="auto" data-setup="{}"></VideoPlayer>
          </b-col>
          <b-col md="6">
            <h5>Webm Version</h5>
            <VideoPlayer id="webmVideo" :sources="getSource(videoUpload.webmLink)" :poster="getPoster(videoUpload)" preload="auto" data-setup="{}"></VideoPlayer>
          </b-col>
          <b-col class="text-center mt-3">
            <b-button variant="success" @click="transcribe">Approve</b-button>
          </b-col>
        </b-row>
      </b-card>
      <b-row>
        <b-col sm="12" class="text-center mb-2">
          <b-button v-b-toggle.debug-info>Toggle Debug Info</b-button>
        </b-col>
        <b-collapse id="debug-info" class="mt-2">
          <b-card header="Debug Info" header-tag="header">
            <pre>{{ formatedUpload() }}</pre>
          </b-card>
        </b-collapse>
      </b-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';
const Spinner = require('vue-simple-spinner');
import VideoPlayer from '../views/VideoPlayer.vue';

import {
  VideoUpload,
  VideoUploadState,
  VideoStorageLink
} from '../../../graphql/generated/prisma';

interface IWindowWithVideoJS extends Window {
  videojs: any;
}

export default Vue.extend({
  name: 'VideoSubmission',
  components: {
    Spinner,
    VideoPlayer
  },
  data: function() {
    return {
      videoUpload: {},
      selectThumbnailDisabled: false,
      loading: false
    };
  },
  methods: {
    formatedUpload() {
      return JSON.stringify(this.videoUpload, null, 2);
    },
    getPoster(video: VideoUpload) {
      const storageLink = video.thumbnail;
      const linkUrl = `https://storage.googleapis.com/${
        storageLink.bucket
      }/${encodeURI(storageLink.path)}`;
      return linkUrl;
    },
    selectThumbnail() {
      this.selectThumbnailDisabled = true;
      const player = (window as IWindowWithVideoJS).videojs.default('rawVideo');
      if (!player.paused()) {
        return this.$notify({
          type: 'warn',
          title: 'Pause video',
          text: 'You must pause the video before selecting a thumbnail.'
        });
      }

      setTimeout(() => {
        const timestamp = player.currentTime();
        console.log('Setting thumbnail to frame at ' + timestamp);
        this.$apollo.mutate({
          mutation: gql`
            mutation($id: ID!, $timestamp: Float!) {
              setVideoUploadThumbnail(id: $id, timestamp: $timestamp) {
                id
                state
                status
              }
            }
          `,
          variables: {
            id: this.videoUpload.id,
            timestamp
          }
        });
      }, 500);
    },
    getSource(storageLink: VideoStorageLink) {
      const linkUrl = `https://storage.googleapis.com/${
        storageLink.bucket
      }/${encodeURI(storageLink.path)}`;
      return [{ src: linkUrl, type: 'video/mp4' }];
    },
    performAction(id: string, state: VideoUploadState) {
      switch (state) {
        case 'PENDING':
          this.startProcessing(id);
          break;
        case 'PROCESSING':
          this.$notify({
            type: 'info',
            title: 'Video is processing'
          });
          break;
        default:
          break;
      }
    },
    async deleteUpload(itemId: string) {
      if (window.confirm('Are you you want to delete this video?')) {
        await this.$apollo.mutate({
          mutation: gql`
            mutation($id: ID!) {
              deleteVideoUpload(id: $id) {
                id
              }
            }
          `,
          variables: {
            id: itemId
          }
        });

        this.$apollo.queries.videoUploads.refresh();

        this.$notify({
          type: 'danger',
          title: 'Video deleted'
        });
      }
    },
    async startProcessing() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($id: ID!) {
            startProcessingPipeline(id: $id) {
              id
              status
              state
            }
          }
        `,
        variables: {
          id: this.videoUpload.id
        }
      });

      this.$notify({
        type: 'success',
        title: 'Video processing...'
      });
    },
    async transcribe() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($id: ID!) {
            transcribe(id: $id) {
              state
              status
            }
          }
        `,
        variables: {
          id: this.videoUpload.id
        }
      });

      this.$notify({
        type: 'success',
        title: 'Video processing...'
      });
    }
  },
  apollo: {
    videoUpload: {
      query: gql`
        query videoUpload($videoSubmissionId: ID!) {
          videoUpload(id: $videoSubmissionId) {
            id
            submitedBy {
              id
              displayName
              avatar
            }
            status
            state
            submitedUrl
            rawStorageLink {
              id
              path
              bucket
            }
            webmLink {
              id
              path
              bucket
            }
            mp4Link {
              id
              path
              bucket
            }
            thumbnail {
              id
              path
              bucket
            }
            metadata {
              title
              subtitle
              advertisingEnabled
              tags(orderBy: name_ASC) {
                name
              }
              sources {
                publication {
                  avatarPath
                  name
                }
                url
                title
                priority
              }
              dateRecorded {
                month
                day
                year
              }
            }
          }
        }
      `,
      variables() {
        return {
          videoSubmissionId: this.$route.params.submissionId
        };
      },
      pollInterval: 1000
    }
  }
});
</script>
