<template>
  <b-row>
    <b-col>
      <b-form-group>
        <div>
          <b-btn v-b-modal.newSourceModal size="sm" class="mx-2" variant="primary">
            <i class="icon icon-plus" />&nbsp;Add source
          </b-btn>
          <b-modal id="newSourceModal" ref="newSourceModal" size="sm" hide-header centered @ok="handleAddSourceModal">
            <form @submit.stop.prevent>
              <label for="speakerName">News source URL:</label>
              <b-form-input id="sourceUrlInput" v-model="sourceUrlInput" type="text" />
            </form>
          </b-modal>
        </div>
        <div v-if="editableUpload.metadata.newsSources.length === 0 && newsCreateInputs.create.length === 0" class="text-center">
          <h4 class="text-muted my-4">No News Sources</h4>
        </div>
        <div v-else class="mt-3">
          <div v-if="editableUpload.metadata.newsSources.length > 0">
            <h5 class="text-muted">Existing Sources</h5>
            <b-table :items="editableUpload.metadata.newsSources" thead-class="d-none">
            </b-table>
          </div>
          <div v-if="newsCreateInputs.create.length > 0">
            <h5 class="text-muted">New Sources</h5>
            <b-table :items="newsCreateInputs.create" thead-class="d-none">
            </b-table>
          </div>
          <div class="text-center">
            <b-btn variant="primary" @click="handleSaveSources">Save</b-btn>
          </div>
        </div>
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script lang="ts">
  import { NewsSourceItemCreateInput, NewsSourceItemCreateManyInput } from '@trumpsaid/prisma'
  import { isURL } from 'validator';
  import Vue from 'vue';
  import { ADD_NEWS_SOURCE_ITEMS } from '../constants/graphql';

  export default Vue.extend({
    name: 'VideoSubmissionMetadata',
    components: {},
    props: {
      videoUpload: Object,
    },
    data() {
      return {
        editableUpload: { metadata: { newsSources: [] } },
        sourceUrlInput: '',
        newsCreateInputs: { create: [] } as NewsSourceItemCreateManyInput
      };
    },
    mounted() {
      this.editableUpload = JSON.parse(JSON.stringify(this.videoUpload));
      this.$forceUpdate();
    },
    methods: {
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
        await this.$apollo.mutate({
          mutation: ADD_NEWS_SOURCE_ITEMS,
          variables: {
            id: this.videoUpload.id,
            newsItemCreateInputs: this.newsCreateInputs,
          },
        });

        return this.$notify({
          type: 'success',
          title: 'Saved sources!',
        });
      },
    },
    apollo: {},
  });
</script>
