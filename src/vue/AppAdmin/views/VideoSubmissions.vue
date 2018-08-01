<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row class="mb-4">
        <b-col>
          <b-btn v-b-modal.submitVideoModal variant="primary" size="sm"><i class="icon-plus icon"></i> Add video</b-btn>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card>
            <b-table small responsive="sm" :items="videoUploads" :fields="fields" :current-page="currentPage" :per-page="perPage">
              <template slot="name" slot-scope="data">
                {{ data.item.submitedBy.displayName }}
              </template>
              <template slot="submitedUrl" slot-scope="data">
                <a :href="data.item.submitedUrl">{{ data.item.submitedUrl}}<i class="icon-share-alt icons pull-right mt-1"></i></a>
              </template>
              <template slot="status" slot-scope="data">
                <b-badge :variant="getBadge(data.item.status)">{{getStatusString(data.item.status)}}</b-badge>
              </template>
              <template slot="action" slot-scope="data">
                <a @click="performAction(data.item.id, data.item.state)" class="badge badge-secondary" v-html="getActionString(data.item.state, data.item.status)"></a>
              </template>
              <template slot="delete" slot-scope="data">
                <a @click="deleteUpload(data.item.id)" class="badge badge-danger"><i class="icon-trash icons"></i></a>
              </template>
            </b-table>
          </b-card>
        </b-col>
      </b-row>
      <VideoSubmitModal/>
    </div>
  </div>
</template>

<script lang="ts">
import gql from "graphql-tag";
import VideoSubmitModal from "../forms/VideoSubmitModal.vue";
import {
  VideoUploadState,
  VideoUploadStatus,
  User
} from "../../../graphql/generated/prisma";

interface IVideoUpload {
  id: string;
  submitedUrl: string;
  submitedBy: User;
  status: VideoUploadStatus;
  state: VideoUploadState;
  rawStorageLink: any;
}

export default {
  name: "VideoSubmissions",
  components: {
    VideoSubmitModal
  },
  data: function() {
    return {
      videoUploads: [] as [IVideoUpload],
      fields: [
        { key: "name", label: "Submited By" },
        { key: "submitedUrl", label: "Link" },
        { key: "status" },
        { key: "action" },
        { key: "delete", label: "" }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0
    };
  },
  methods: {
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
    getRowCount(items: [IVideoUpload]) {
      return items.length;
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
    async startProcessing(itemId: string) {
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
          id: itemId
        }
      });

      this.$apollo.queries.videoUploads.refresh();

      this.$notify({
        type: "success",
        title: "Video processing..."
      });
    }
  },
  apollo: {
    videoUploads: {
      query: gql`
        query {
          videoUploads {
            id
            submitedUrl
            state
            submitedBy {
              displayName
              id
              avatar
            }
            status
            rawStorageLink {
              version
              bucket
              path
            }
          }
        }
      `,
      pollInterval: 2000
    }
  }
};
</script>

<style>
</style>
