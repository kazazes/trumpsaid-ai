<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <router-view></router-view>
      <b-row class="mb-4">
        <b-col>
          <b-btn v-b-modal.submitVideoModal variant="primary" size="sm"><i class="icon-plus icon"></i> Create new upload</b-btn>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="$apollo.loading">
          <Spinner></Spinner>
        </b-col>
        <b-col v-else-if="videoUploads.length === 0" class="text-center">
          <h3 class="text-muted">There are no active uploads.</h3>
        </b-col>
        <b-col v-else class="cardless">
          <b-table responsive="sm" class="table-hover" :items="videoUploads" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="presentDetailPage">
            <template slot="name" slot-scope="data">
              {{ data.item.submitedBy.displayName }}
            </template>
            <template slot="createdAt" slot-scope="data">
              {{ timeFromDate(data.item.createdAt) }}
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
import moment from 'moment';
import { VideoUpload } from '../../../graphql/generated/prisma';
import { LIST_UPLOADS } from '../constants/graphql.ts';
import VideoSubmitModal from '../forms/VideoSubmitModal.vue';

// tslint:disable-next-line:variable-name
const Spinner = require('vue-simple-spinner');

export default {
  name: 'VideoSubmissions',
  components: {
    VideoSubmitModal,
    Spinner,
  },
  data: () => {
    const videoUploads: VideoUpload[] = [];
    return {
      videoUploads,
      fields: [
        { key: 'name', label: 'Submittor' },
        { key: 'createdAt', label: 'Submited' },
        { key: 'delete', label: '' },
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
    };
  },
  methods: {
    presentDetailPage(submission: VideoUpload) {
      this.$router.push({
        path: `/videos/submissions/${submission.id}`,
      });
    },
    timeFromDate(date: Date) {
      return moment(date).from(moment());
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
            id: itemId,
          },
        });

        this.$apollo.queries.videoUploads.refresh();

        this.$notify({
          type: 'danger',
          title: 'Video deleted',
        });
      }
    },
  },
  apollo: {
    videoUploads: {
      query: LIST_UPLOADS,
      pollInterval: 2000,
    },
  },
};
</script>

<style>
</style>
