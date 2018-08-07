<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <router-view></router-view>
      <b-row class="mb-4">
        <b-col>
          <b-btn v-b-modal.submitVideoModal variant="primary" size="sm"><i class="icon-plus icon"></i> Add video</b-btn>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="$apollo.loading">
          <Spinner></Spinner>
        </b-col>
        <b-col v-else class="cardless">
          <b-table responsive="sm" class="table-hover" :items="videoUploads" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="presentDetailPage">
            <template slot="name" slot-scope="data">
              {{ data.item.submitedBy.displayName }}
            </template>
            <template slot="createdAt" slot-scope="data">
              {{ timeFromDate(data.item.createdAt) }}
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
        </b-col>
      </b-row>
      <VideoSubmitModal/>
    </div>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import VideoSubmitModal from '../forms/VideoSubmitModal.vue';
import moment from 'moment';
const Spinner = require('vue-simple-spinner');

import {
  VideoUploadState,
  VideoUploadStatus,
  VideoUpload
} from '../../../graphql/generated/prisma';

export default {
  name: 'VideoSubmissions',
  components: {
    VideoSubmitModal,
    Spinner
  },
  data: function() {
    return {
      videoUploads: [] as [VideoUpload],
      fields: [
        { key: 'name', label: 'Submittor' },
        { key: 'createdAt', label: 'Submited' },
        { key: 'status' },
        { key: 'action' },
        { key: 'delete', label: '' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0
    };
  },
  methods: {
    presentDetailPage(submission: VideoUpload) {
      console.log(JSON.stringify(submission));
      this.$router.push({
        path: `/videos/submissions/${submission.id}`
      });
    },
    timeFromDate(date: Date) {
      return moment(date).from(moment());
    },
    getBadge(status: VideoUploadStatus) {
      switch (status) {
        case 'AWAITING_PROCESSING':
          return 'warning';
        case 'DOWNLOADING':
          return 'primary';
        default:
          return 'secondary';
      }
    },
    getStatusString(status: VideoUploadStatus) {
      switch (status) {
        case 'AWAITING_PROCESSING':
          return 'Needs Processing';
        case 'DOWNLOADING':
          return 'Downloading';
        case 'READY_TO_RENDER':
          return 'Ready to render';
        case 'GENERATING_THUMBNAILS':
          return 'Generating thumbnails';
        default:
          return status;
      }
    },
    getActionString(state: VideoUploadState, status: VideoUploadStatus) {
      if (status === 'AWAITING_PROCESSING') {
        switch (state) {
          case 'PENDING':
            return 'Process';
          case 'PROCESSING':
            return `Dispatching job <i class="fa fa-circle-o-notch fa-spin"></i>`;
          case 'FAILED':
            return 'Failed dispatching';
          default:
            return '';
        }
      } else if (status === 'DOWNLOADING') {
        switch (state) {
          case 'PENDING':
            return 'Pending Download';
          case 'PROCESSING':
            return 'Downloading';
          case 'REJECTED':
            return 'Download rejected';
          case 'FAILED':
            return 'Download failed';
          default:
            return '';
        }
      } else if (status === 'READY_TO_RENDER') {
        switch (state) {
          case 'PENDING':
            return 'Render';
          case 'PROCESSING':
            return 'Rendering';
          case 'FAILED':
            return 'Failed rendering';
          default:
            return '';
        }
      }
      return '';
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
    getRowCount(items: [VideoUpload]) {
      return items.length;
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
    async startProcessing(itemId: string) {
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
          id: itemId
        }
      });

      this.$apollo.queries.videoUploads.refresh();

      this.$notify({
        type: 'success',
        title: 'Video processing...'
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
            createdAt
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
