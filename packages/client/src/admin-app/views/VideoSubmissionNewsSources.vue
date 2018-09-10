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
        <div v-if="editableUpload.metadata.newsSources.length === 0" class="text-center">
          <h4 class="text-muted my-4">No News Sources</h4>
        </div>
        <div v-else class="text-center">
          <b-btn variant="primary" @click="handleSaveSources">Save</b-btn>
        </div>
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script lang="ts">
  import Vue from 'vue';
  import { UPDATE_METADATA } from '../constants/graphql';

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
      };
    },
    mounted() {
      this.editableUpload = JSON.parse(JSON.stringify(this.videoUpload));
      this.$forceUpdate();
    },
    methods: {
      handleAddSourceModal() {
        console.log(this.sourceUrlInput);
      },
      async handleSaveSources() {
        const update = {};

        await this.$apollo.mutate({
          mutation: UPDATE_METADATA,
          variables: {
            id: this.videoUpload.id,
            metadata: update,
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
