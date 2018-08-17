<template>
  <b-row>
    <b-col>
      <b-form-group>
        <div>
          <b-btn size="sm" class="mx-2" v-b-modal.newSourceModal variant="primary"><i class="icon icon-plus"></i>&nbsp;Add source</b-btn>
          <b-modal id="newSpeakerModal" ref="newSourceModal" size="sm" hide-header centered @ok="handleAddSourceModal">
            <form @submit.stop.prevent="handleAddSourceSubmit">
              <label for="speakerName">News source URL:</label>
              <b-form-input id="sourceUrlInput" v-model="sourceUrlInput" type="text"></b-form-input>
            </form>
          </b-modal>
        </div>
        <div v-if="editableUpload.metadata.newsSources.length === 0" class="text-center">
          <h4 class="text-muted my-4">No News Sources</h4>
        </div>
        <div v-else class="text-center">
          <b-btn @click="handleSaveSources" variant="primary">Save</b-btn>
        </div>
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script lang="ts">
import Vue from 'vue';
import { VideoUpload } from '../../../graphql/generated/prisma';
import { UPDATE_METADATA } from '../constants/graphql.ts';

export default Vue.extend({
  name: 'VideoSubmissionMetadata',
  components: {},
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
  props: {
    videoUpload: Object,
  },
  methods: {
    handleAddSourceSubmit() {

    },
    handleAddSourceModal() {

    },
    async handleSaveSources() {
      const metadata = this.editableUpload.metadata;

      const update = {
      };
      
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
  apollo: {
  },
});
</script>
