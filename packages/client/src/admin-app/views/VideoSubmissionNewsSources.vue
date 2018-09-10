<template>
  <b-row>
    <b-col>
      <b-form-group>
        <div>
          <b-btn v-b-modal.newSourceModal class="mx-2" variant="primary">
            <i class="icon icon-plus" />&nbsp;Add source
          </b-btn>
          <b-btn v-if="newsCreateInputs.create.length > 0" variant="success" :disabled="saveDisabled" @click="handleSaveSources">Save</b-btn>
          <b-modal id="newSourceModal" ref="newSourceModal" size="sm" hide-header centered @ok="handleAddSourceModal">
            <form @submit.stop.prevent>
              <label for="speakerName">News source URL:</label>
              <b-form-input id="sourceUrlInput" v-model="sourceUrlInput" type="text" />
            </form>
          </b-modal>
        </div>
        <div v-if="videoUpload.metadata.newsSources.length === 0 && newsCreateInputs.create.length === 0" class="text-center">
          <h4 class="text-muted my-4">No News Sources</h4>
        </div>
        <div v-else class="mt-3">
          <div v-if="newsCreateInputs.create.length > 0">
            <h5 class="text-muted">Pending Sources</h5>
            <b-table :items="newsCreateInputs.create" thead-class="d-none">
            </b-table>
          </div>
          <div v-if="videoUpload.metadata.newsSources.length > 0">
            <h5 class="text-muted">News Sources</h5>
            <b-table :items="videoUpload.metadata.newsSources" ref="existingSources" :fields="existingItemsFields">
              <template slot="logo" slot-scope="data">
                <img :src="data.item.logo" height="30">
              </template>
              <template slot="publishedDate" slot-scope="data">
                {{data.value.publishedDate | formatTimestamp }}
              </template>
              <template slot="createdAt" slot-scope="data">
                {{data.value.createdAt | formatTimestamp }}
              </template>
              <template slot="url" slot-scope="data">
                <a :href="data.item.url" target="_blank">
                  <i class="fa fa-external-link"></i>
                </a>
              </template>
              <template slot="delete" slot-scope="data">
                <a class="btn btn-danger btn-sm" @click.prevent.stop="deleteNewsItem(data.item.id)">
                  <i class="icon-trash icons" />
                </a>
              </template>
            </b-table>
          </div>
        </div>
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script lang="ts">
  import { NewsSourceItemCreateInput, NewsSourceItemCreateManyInput } from '@trumpsaid/prisma'
  import moment from 'moment';
  import { isURL } from 'validator';
  import Vue from 'vue';
  import { ADD_NEWS_SOURCE_ITEMS, DELETE_NEWS_SOURCE_ITEM, VIDEO_UPLOAD_DETAILS } from '../constants/graphql';

  export default Vue.extend({
    name: 'VideoSubmissionMetadata',
    components: {},
    props: {
      videoUpload: Object,
    },
    filters: {
      formatTimestamp: (s: string) => {
        return moment(s).format('l');
      },
    },
    data() {
      return {
        sourceUrlInput: '',
        newsCreateInputs: { create: [] } as NewsSourceItemCreateManyInput,
        existingItemsFields: ['logo', 'publisher', 'author', {          key: 'publishedDate',
          label: 'Published'        }, 'title', { key: 'url', label: '' }, { key: 'delete', label: '' }],
        saveDisabled: false
      };
    },
    methods: {
      async deleteNewsItem(id) {
        this.$notify({
          type: 'info',
          title: 'Deleting source...',
        });
        await this.$apollo.mutate({
          mutation: DELETE_NEWS_SOURCE_ITEM,
          variables: {
            id
          },
        });
        this.$notify({
          type: 'success',
          title: 'Deleted source.',
        });
      },
      handleAddSourceModal() {
        const url = this.sourceUrlInput;
        this.sourceUrlInput = '';
        if (!isURL(url)) {
          return this.$notify({
            type: 'error',
            title: 'Add source failed',
            text: 'The URL is invalid.'
          });
        }
        const create: NewsSourceItemCreateInput = { url };
        this.newsCreateInputs.create.push(create);
      },
      async handleSaveSources() {
        this.saveDisabled = true;
        this.$notify({
          type: 'info',
          title: 'Adding sources...',
        });

        try {
          const result = await this.$apollo.mutate({
            mutation: ADD_NEWS_SOURCE_ITEMS,
            variables: {
              id: this.videoUpload.id,
              newsItemCreateInputs: this.newsCreateInputs,
            },
          });

          this.newsCreateInputs.create = [];
          this.saveDisabled = false;
          return this.$notify({
            type: 'success',
            title: 'Saved sources!',
          });
        } catch (e) {
          return this.$notify({
            type: 'error',
            title: 'There was a problem saving your sources.',
          });
        }
      }
    },
    apollo: {}
  });
</script>
