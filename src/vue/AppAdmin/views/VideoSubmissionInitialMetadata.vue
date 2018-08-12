<template>
  <b-row>
    <b-col md="8">
      <VideoPlayer id="master" ref="masterPlayer" v-on:playerLoaded="setPlaceholderEnd" :sources="getSource(getAMaster())" preload="auto" data-setup="{}"></VideoPlayer>
    </b-col>
    <b-col md="4">
      <b-form-group>
        <b-form-group>
          <label for="numberOfSpeakers">Number of speakers in video:</label>
          <b-form-input type="number" id="numberOfSpeakers" :value="initialMetadata.numberOfSpeakers"></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="thumbnailTimestamp">Thumbnail timestamp:</label>
          <b-input-group>
            <b-form-input id="thumbnailTimestamp" :value="initialMetadata.thumbnailTimestamp" disabled></b-form-input>
            <b-input-group-append>
              <b-btn variant="outline-success" v-on:click="setToPlayerTime('thumbnailTimestamp')">Set to player time</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group>
          <label for="videoStartTimestamp">Video start:</label>
          <b-input-group>
            <b-form-input id="videoStartTimestamp" disabled value="00:00:00" :value="initialMetadata.renderStart"></b-form-input>
            <b-input-group-append>
              <b-btn variant="outline-success" v-on:click="setToPlayerTime('renderStart')">Set to player time</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group>
          <label for="videoEndTimestamp">Video end:</label>
          <b-input-group>
            <b-form-input id="videoEndTimestamp" disabled ref="videoEnd" :value="initialMetadata.renderEnd"></b-form-input>
            <b-input-group-append>
              <b-btn variant="outline-success" v-on:click="setToPlayerTime('renderEnd')">Set to player time</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <div class="text-center">
          <b-btn @click="submitInitialMetadata">Submit</b-btn>
        </div>
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script lang="ts">
import timestampFormat from 'hh-mm-ss';
import Vue from 'vue';
import { VideoUpload, VideoUploadStorageLink } from '../../../graphql/generated/prisma';
import { SET_INITIAL_UPLOAD_METADATA } from '../constants/graphql.ts';
import VideoPlayer from './VideoPlayer.vue';

export default Vue.extend({
  name: 'VideoSubmissionInitialMetadata',
  components: {
    VideoPlayer,
  },
  computed: {
    renderStartInSeconds: {
      get() { return timestampFormat.toMs(this.initialMetadata.renderStart) / 1000; },
    },
    renderEndInSeconds: {
      get() { return timestampFormat.toMs(this.initialMetadata.renderEnd) / 1000; },
    },
    thumbnailTimestampInSeconds: {
      get() { return timestampFormat.toMs(this.initialMetadata.thumbnailTimestamp) / 1000; },
    },
  },
  data: () => {
    return {
      initialMetadata: {
        renderStart: '00:00',
        renderEnd: '00:00',
        thumbnailTimestamp: '',
        numberOfSpeakers: 2,
      },
    };
  },
  props: {
    videoUpload: Object,
  },
  methods: {
    submitInitialMetadata() {
      if (this.renderStartInSeconds > this.renderEndInSeconds) {
        return this.$notify({
          type: 'error',
          title: 'Video start must be before video end...',
        });
      }

      if (!(this.renderEndInSeconds !== undefined && this.renderStartInSeconds !== undefined && this.thumbnailTimestampInSeconds !== undefined)) {
        return this.$notify({
          type: 'error',
          title: 'Thumbnail, start and end time are required!',
        });
      }

      this.$apollo.mutate({
        mutation: SET_INITIAL_UPLOAD_METADATA,
        variables: {
          id: this.videoUpload.id,
          thumbnailTimestamp: this.thumbnailTimestampInSeconds,
          renderStart: this.renderStartInSeconds,
          renderEnd: this.renderEndInSeconds,
          numberOfSpeakers: this.initialMetadata.numberOfSpeakers,
        }});
    },
    setPlaceholderEnd() {
      this.initialMetadata.renderEnd = timestampFormat.fromS(this.$refs.masterPlayer.player.duration(), 'hh:mm:ss');
    },
    formatedUpload() {
      return JSON.stringify(this.videoUpload, null, 2);
    },
    getPoster(video: VideoUpload) {
      const storageLink = video.storageLinks.find(link => link.version === 'WEB' && link.fileType === 'THUMBNAIL');
      const linkUrl = `https://storage.googleapis.com/${
        storageLink.bucket
      }/${encodeURI(storageLink.path)}`;
      return linkUrl;
    },
    setToPlayerTime(prop) {
      const player = this.$refs.masterPlayer.player;

      if (!player.paused()) {
        return this.$notify({
          type: 'warn',
          title: 'Pause video',
          text: 'You must pause the video first.',
        });
      }

      this.initialMetadata[prop] = timestampFormat.fromS(player.currentTime(), 'hh:mm:ss');
    },
    getSource(storageLink: VideoUploadStorageLink) {
      const linkUrl = `https://storage.googleapis.com/${
        storageLink.bucket
      }/${encodeURI(storageLink.path)}`;
      return [{ src: linkUrl, type: 'video/mp4' }];
    },
    getAMaster(): VideoUploadStorageLink {
      return this.videoUpload.storageLinks.find(
        (link: VideoUploadStorageLink) => { return link.version === 'MASTER' && (link.fileType === 'MP4' || link.fileType === 'WEBM'); });
    },
  },
  apollo: {
    setInitialMetadata: {
      query: SET_INITIAL_UPLOAD_METADATA,
      variables() {
        return {
          id: this.videoUpload.id,
          thumbnailTimestamp: this.thumbnailTimestampInSeconds,
          renderStart: this.renderStartInSeconds,
          renderEnd: this.renderEndInSeconds,
        };
      },
      skip: true,
    },
  },
});
</script>
