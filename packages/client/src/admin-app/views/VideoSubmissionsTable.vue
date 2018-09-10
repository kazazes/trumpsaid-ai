<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <router-view />
      <b-row class="mb-4">
        <b-col>
          <b-btn v-b-modal.submitVideoModal variant="primary" size="sm">
            <i class="icon-plus icon" /> Create new upload</b-btn>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="$apollo.loading">
          <Spinner />
        </b-col>
        <b-col v-else-if="videoUploads.length === 0" class="text-center">
          <h3 class="text-muted">There are no active uploads.</h3>
        </b-col>
        <b-col v-else class="cardless">
          <b-table responsive="sm" class="table-hover" :items="videoUploads" :fields="fields" @row-clicked="presentDetailPage">
            <template slot="name" slot-scope="data">
              {{ data.item.submitedBy.displayName }}
            </template>
            <template slot="createdAt" slot-scope="data">
              {{ timeFromDate(data.item.createdAt) }}
            </template>
            <template slot="delete" slot-scope="data">
              <a class="btn btn-danger" @click.prevent.stop="deleteUpload(data.item.id)">
                <i class="icon-trash icons" />
              </a>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <VideoSubmitModal />
    </div>
  </div>
</template>

<script lang="ts">
    import { VideoUpload } from '@trumpsaid/prisma';
  import gql from 'graphql-tag';
  import moment from 'moment';
import Vue from 'vue';
  import Component from 'vue-class-component';
  import { LIST_UPLOADS } from '../constants/graphql';
  import VideoSubmitModal from '../forms/VideoSubmitModal.vue';

  // tslint:disable-next-line:variable-name
  const Spinner = require('vue-simple-spinner');

  @Component({
    name: 'VideoSubmissions',
    components: {
      VideoSubmitModal,
      Spinner,
    },
    apollo: {
      videoUploads: {
        query: LIST_UPLOADS,
        pollInterval: 2000,
      },
    },
  })
  export default class VideoSubmissions extends Vue {
    public videoUploads: VideoUpload[];
    public fields: any = [
      { key: 'name', label: 'Submittor' },
      { key: 'createdAt', label: 'Submited' },
      { key: 'delete', label: '' },
    ];

    public presentDetailPage(submission: VideoUpload) {
      this.$router.push({
        path: `/videos/submissions/${submission.id}`,
      });
    }

    public timeFromDate(date: Date) {
      return moment(date).from(moment());
    }

    get rowCount() {
      return this.videoUploads.length;
    }

    public async deleteUpload(itemId: string) {
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
    }
  }
</script>

<style>
</style>
