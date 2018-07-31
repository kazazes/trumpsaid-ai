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
            <b-table hover small responsive="sm" :items="videoUploads" :fields="fields" :current-page="currentPage" :per-page="perPage">
              <template slot="name" slot-scope="data">
                {{ data.item.submitedBy.displayName }}
              </template>
              <template slot="submitedUrl" slot-scope="data">
                <a :href="data.item.submitedUrl">{{ data.item.submitedUrl}}<i class="icon-share-alt icons pull-right"></i></a>
              </template>
              <template slot="status" slot-scope="data">
                <b-badge :variant="getBadge(data.item.status)">{{getStatusString(data.item.status)}}</b-badge>
              </template>
              <template slot="delete" slot-scope="data">
                <b-btn class="btn-danger btn-sm" @click="deleteUpload(data.item.id)"><i class="icon-trash icons bg-danger"></i></b-btn>
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

interface IVideoUpload {
  id: string;
  submitedUrl: string;
  submitedBy: any;
  status: string;
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
        { key: "delete" }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0
    };
  },
  methods: {
    getBadge(status: string) {
      return status === "Active"
        ? "success"
        : status === "Inactive"
          ? "secondary"
          : status === "AWAITING_PROCESSING"
            ? "warning"
            : status === "Banned" ? "danger" : "primary";
    },
    getStatusString(status: string) {
      switch (status) {
        case "AWAITING_PROCESSING":
          return "Processing";
        default:
          return status;
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
    }
  },
  apollo: {
    videoUploads: {
      query: gql`
        query {
          videoUploads {
            id
            submitedUrl
            submitedBy {
              displayName
              id
              avatar
            }
            status
            rawStorageLink {
              fullVersion
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
