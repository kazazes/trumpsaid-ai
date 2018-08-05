<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-col v-if="$apollo.loading">
        <Spinner></Spinner>
      </b-col>
      <b-button v-if="videoUpload.status === 'AWAITING_PROCESSING'" block variant="info" @click="startProcessing">Begin Processing</b-button>
      <b-card v-else-if="videoUpload.status === 'DOWNLOADING'" class="text-center">
        <h5>Downloading...</h5>
        <Spinner></Spinner>
      </b-card>
      <b-card v-else-if="videoUpload.status === 'READY_TO_RENDER'" header="Raw video">
        <b-row>
          <b-col md="6">
            <VideoPlayer id="rawVideo" :sources="getRawVideoSources(videoUpload)" preload="auto" data-setup="{}"></VideoPlayer>
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
      {{ videoUpload }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
const Spinner = require("vue-simple-spinner");
import VideoPlayer from "../views/VideoPlayer";

import {
  VideoUpload,
  VideoUploadState,
  VideoUploadStatus
} from "../../../graphql/generated/prisma";

export default Vue.extend({
  name: "VideoSubmission",
  components: {
    Spinner,
    VideoPlayer
  },
  data: function() {
    return {
      videoUpload: {}
    };
  },
  methods: {
    getRawVideoSources(videoUpload: VideoUpload) {
      const storageLink = videoUpload.rawStorageLink;
      const linkUrl = `https://storage.googleapis.com/${
        storageLink.bucket
      }/${encodeURI(storageLink.path)}`;

      return [{ src: linkUrl, type: "video/mp4" }];
    },
    getBadge(status: VideoUploadStatus) {
      switch (status) {
        case "AWAITING_PROCESSING":
          return "warning";
        case "DOWNLOADING":
          return "primary";
        default:
          return "secondary";
      }
    },
    getStatusString(status: VideoUploadStatus) {
      switch (status) {
        case "AWAITING_PROCESSING":
          return "Needs Processing";
        case "DOWNLOADING":
          return "Downloading";
        case "READY_TO_RENDER":
          return "Ready to render";
        case "GENERATING_THUMBNAILS":
          return "Generating thumbnails";
        default:
          return status;
      }
    },
    getActionString(state: VideoUploadState, status: VideoUploadStatus) {
      if (status === "AWAITING_PROCESSING") {
        switch (state) {
          case "PENDING":
            return "Process";
          case "PROCESSING":
            return `Dispatching job <i class="fa fa-circle-o-notch fa-spin"></i>`;
          case "FAILED":
            return "Failed dispatching";
          default:
            return "";
        }
      } else if (status === "DOWNLOADING") {
        switch (state) {
          case "PENDING":
            return "Pending Download";
          case "PROCESSING":
            return "Downloading";
          case "REJECTED":
            return "Download rejected";
          case "FAILED":
            return "Download failed";
          default:
            break;
        }
      } else if (status === "READY_TO_RENDER") {
        switch (state) {
          case "PENDING":
            return "Render";
          case "PROCESSING":
            return "Rendering";
          case "FAILED":
            return "Failed rendering";
          default:
            break;
        }
      }
    },
    performAction(id: string, state: VideoUploadState) {
      switch (state) {
        case "PENDING":
          this.startProcessing(id);
          break;
        case "PROCESSING":
          this.$notify({
            type: "info",
            title: "Video is processing"
          });
          break;
        default:
          break;
      }
    },
    async deleteUpload(itemId: string) {
      if (window.confirm("Are you you want to delete this video?")) {
        const result = await this.$apollo.mutate({
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
          type: "danger",
          title: "Video deleted"
        });
      }
    },
    async startProcessing() {
      const result = await this.$apollo.mutate({
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

      this.$apollo.queries.videoUpload.refresh();

      this.$notify({
        type: "success",
        title: "Video processing..."
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
            autoTranscription
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
            metadata {
              title
              subtitle
              transcript(orderBy: timestampStart_ASC) {
                speaker {
                  name
                  avatarPath
                }
                timestampStart
                content
              }
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
        return { videoSubmissionId: this.$route.params.submissionId };
      },
      pollInterval: 2000
    }
  }
});
</script>
