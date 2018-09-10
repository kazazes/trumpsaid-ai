<template>
  <b-row>
    <b-col>
      <b-form-group>
        <b-row>
          <b-col md="6">
            <b-form-group>
              <label for="videoTitle">Title:</label>
              <b-form-input id="videoTitle" v-model="editableUpload.metadata.title" :value="editableUpload.metadata.title" />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label for="dateRecorded">Date Recorded:</label>
              <DatePicker id="dateRecorded" v-model="editableUpload.metadata.dateRecorded" :value="dateRecordedAsDate" input-class="form-control" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group>
              <label for="subtitle">Subtitle:</label>
              <b-form-textarea id="subtitle" v-model="editableUpload.metadata.subtitle" rows="3" placeholder="The subtitle of the video." :value="editableUpload.metadata.subtitle" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <label>Tags:</label>
          </b-col>
          <b-col md="6">
            <label>Suggested:</label>
          </b-col>
        </b-row>
        <div class="text-center">
          <b-btn variant="primary" @click="handleAdditionalMetadata">Save</b-btn>
        </div>
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script lang="ts">
  import { Date as GraphQLDate } from '@trumpsaid/prisma';
  import moment from 'moment';
  import Vue from 'vue';
  import { UPDATE_METADATA } from '../constants/graphql';

  // tslint:disable-next-line:no-var-requires variable-name
  const DatePicker = require('vuejs-datepicker');

  export default Vue.extend({
    name: 'VideoSubmissionMetadata',
    components: {
      DatePicker,
    },
    data() {
      return {
        editableUpload: {
          metadata: { title: '', subtitle: '', dateRecorded: new Date() },
        },
        dateRecordedInput: undefined,
      };
    },
    mounted() {
      this.editableUpload = JSON.parse(JSON.stringify(this.videoUpload));
      if (this.editableUpload.metadata.dateRecorded) {
        this.editableUpload.metadata.dateRecorded = moment(
          this.editableUpload.metadata.dateRecorded
        ).toDate();
      } else {
        this.editableUpload.metadata.dateRecorded = moment().toDate();
      }
      this.$forceUpdate();
    },
    computed: {
      suggestedTags: {
        get() { },
      },
      dateRecordedAsDate: {
        get(): Date {
          const stored = this.editableUpload.metadata.dateRecorded;
          if (stored) {
            const asMoment = moment(stored);
            return asMoment.toDate();
          } else {
            return new Date();
          }
        },
      },
    },
    props: {
      videoUpload: Object,
    },
    methods: {
      async handleAdditionalMetadata() {
        const metadata = this.editableUpload.metadata;
        let dateCreate: GraphQLDate;
        if (metadata.dateRecorded) {
          const dateMoment = moment(metadata.dateRecorded);
          dateCreate = {
            year: dateMoment.year(),
            month: dateMoment.month(),
            day: dateMoment.date(),
          };
        }

        const update = {
          dateRecorded: { create: dateCreate },
          title: metadata.title,
          subtitle: metadata.subtitle,
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
          title: 'Saved metadata!',
        });
      },
    },
    apollo: {},
  });
</script>
