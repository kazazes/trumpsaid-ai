<template>
  <b-row>
    <b-col md="8">
      <VideoPlayer id="master" ref="masterPlayer" :sources="getSource(getAMaster())" preload="auto" data-setup="{}" @playerLoaded="setPlaceholderEnd" />
    </b-col>
    <b-col md="4">
      <b-form-group>
        <b-form-group>
          <label for="numberOfSpeakers">Number of speakers in video:</label>
          <b-form-input id="numberOfSpeakers" type="number" :value="initialMetadata.numberOfSpeakers" />
        </b-form-group>
        <b-form-group>
          <label for="thumbnailTimestamp">Thumbnail timestamp:</label>
          <b-input-group>
            <b-form-input id="thumbnailTimestamp" :value="initialMetadata.thumbnailTimestamp" disabled />
            <b-input-group-append>
              <b-btn variant="outline-success" @click="setToPlayerTime('thumbnailTimestamp')">Set to player time</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group>
          <label for="videoStartTimestamp">Video start:</label>
          <b-input-group>
            <b-form-input id="videoStartTimestamp" disabled :value="initialMetadata.renderStart" />
            <b-input-group-append>
              <b-btn variant="outline-success" @click="setToPlayerTime('renderStart')">Set to player time</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group>
          <label for="videoEndTimestamp">Video end:</label>
          <b-input-group>
            <b-form-input id="videoEndTimestamp" ref="videoEnd" disabled :value="initialMetadata.renderEnd" />
            <b-input-group-append>
              <b-btn variant="outline-success" @click="setToPlayerTime('renderEnd')">Set to player time</b-btn>
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
  import {
    VideoUpload,
    VideoUploadStorageLink,
  } from '@trumpsaid/prisma';
  import timestampFormat from 'hh-mm-ss';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { SET_INITIAL_UPLOAD_METADATA } from '../constants/graphql';
  import VideoPlayer from './VideoPlayer.vue';

  @Component({
    name: 'VideoSubmissionInitialMetadata',
    components: { VideoPlayer },
    props: { videoUpload: Object as () => VideoUpload },
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
  })
  export default class VideoSubmissionInitialMetadata extends Vue {
    private videoUpload: VideoUpload;
    private initialMetadata: any = {
      renderStart: '00:00',
      renderEnd: '00:00',
      thumbnailTimestamp: '',
      numberOfSpeakers: 2,
    };
    get renderStartInSeconds() {
      return timestampFormat.toMs(this.initialMetadata.renderStart) / 1000;
    }
    get renderEndInSeconds() {
      return timestampFormat.toMs(this.initialMetadata.renderEnd) / 1000;
    }

    get thumbnailTimestampInSeconds() {
      return timestampFormat.toMs(this.initialMetadata.thumbnailTimestamp) / 1000;
    }

    get player() {
      return (this.$refs.masterPlayer as VideoPlayer).player;
    }

    private submitInitialMetadata() {
      if (this.renderStartInSeconds > this.renderEndInSeconds) {
        return this.$notify({
          type: 'error',
          title: 'Video start must be before video end...',
        });
      }

      if (
        !(
          this.renderEndInSeconds !== undefined &&
          this.renderStartInSeconds !== undefined &&
          this.thumbnailTimestampInSeconds !== undefined
        )
      ) {
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
        },
      });
    }
    private setPlaceholderEnd() {
      this.initialMetadata.renderEnd = timestampFormat.fromS(
        this.player.duration(),
        'hh:mm:ss'
      );
    }
    private formatedUpload() {
      return JSON.stringify(this.videoUpload, null, 2);
    }
    private getPoster(video: VideoUpload) {
      const storageLink = video.storageLinks.find(
        (link) => link.version === 'WEB' && link.fileType === 'THUMBNAIL'
      );
      const linkUrl = `https://storage.googleapis.com/${
        storageLink.bucket
        }/${encodeURI(storageLink.path)}`;
      return linkUrl;
    }
    private setToPlayerTime(prop: string) {
      if (!this.player.paused()) {
        return this.$notify({
          type: 'warn',
          title: 'Pause video',
          text: 'You must pause the video first.',
        });
      }

      this.initialMetadata[prop] = timestampFormat.fromS(
        this.player.currentTime(),
        'hh:mm:ss'
      );
    }
    private getSource(storageLink: VideoUploadStorageLink) {
      const linkUrl = `https://storage.googleapis.com/${
        storageLink.bucket
        }/${encodeURI(storageLink.path)}`;
      return [{ src: linkUrl, mimeType: storageLink.mimeType }];
    }
    private getAMaster(): VideoUploadStorageLink {
      return this.videoUpload.storageLinks.find(
        (link: VideoUploadStorageLink) => {
          return (
            link.version === 'MASTER' &&
            (link.fileType === 'MP4' || link.fileType === 'WEBM')
          );
        }
      );
    }
  }
</script>
