<template>
  <b-row class="mb-2">
    <b-col md="6" offset="3" class="mt-3">
      <VideoPlayer id="master" ref="transcribePlayer" v-on:playerTimeUpdate="playerTimeUpdated" v-on:playerLoaded="playerMetadataUpdated" :poster="getPoster(this.videoUpload)" :sources="getSource(getFirstWebVersion())" preload="auto" data-setup="{}"></VideoPlayer>
    </b-col>
    <b-col md="12">
      <div class="text-center">
        <b-btn size="sm" class="my-2" v-b-modal.newSpeakerModal><i class="icon icon-plus"></i>&nbsp;Add Speaker</b-btn>
        <b-modal id="newSpeakerModal" ref="newSpeakerModal" size="sm" hide-header centered @ok="handleAddSpeakerOk">
          <form @submit.stop.prevent="handleAddSpeakerSubmit">
            <label for="speakerName">Speaker's name:</label>
            <b-form-input id="speakerName" type="text" v-model="newSpeakerInput"></b-form-input>
          </form>
        </b-modal>
      </div>
      <table class="table table-sm mx-2">
        <thead>
          <th class="time">Start</th>
          <th class="time">End</th>
          <th class="speaker">Speaker</th>
          <th>Content</th>
          <th class="actionButtons"></th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in editableTranscript">
            <td class="time">
              <a href="" v-on:click.stop.prevent="seekTo(item.start)">
                {{ item.start | formatTimestamp }}  
              </a>
              <b-button-group size="sm" style="width: 100%;" class="my-1">
                <b-btn @click="timeButtonPressed('start', 0.1, item, index)" variant="outline-primary">+0.1</b-btn>
                <b-btn @click="timeButtonPressed('start', -0.1, item, index)" variant="outline-info">-0.1</b-btn>
              </b-button-group> 
            </td>
            <td class="time"> 
              <a href="" v-on:click.stop.prevent="seekTo(item.end)">
                {{ item.end | formatTimestamp }}
              </a>
              <b-button-group size="sm" style="width: 100%;" class="my-1">
                <b-btn @click="timeButtonPressed('end', 0.1, item, index)" variant="outline-primary">+0.1</b-btn>
                <b-btn @click="timeButtonPressed('end', -0.1, item, index)" variant="outline-info">-0.1</b-btn>
              </b-button-group> 
            </td>
            <td class="speaker">
              <div class="form-inline mt-2">
                <select v-model="item.speaker" class="form-control form-control-sm">
                  <option v-if="item.speaker" selected>
                    {{ item.speaker.name }}
                  </option>
                  <option v-else disabled selected value="null">Select speaker</option>
                  <option v-for="speaker in newSpeakers" :value="speaker">
                    {{ speaker.name }}
                  </option>
                  <option v-for="speaker in allSpeakers" :value="speaker">
                    {{ speaker.name }}
                  </option>
                </select>
              </div>
            </td>
            <td>
              <div class="form-inline mt-2">
                <textarea v-model="item.content" rows="1" class="form-control" style="width: 100%">
                  {{ item.content }}
                </textarea>
              </div>
            </td>
            <td class="actionButtons">
              <b-button-group size="sm" class="mt-2 mr-3 pull-right">
                <b-button  v-if="index < editableTranscript.length - 1" @click="mergeDownPressed(item, index)" variant="outline-primary"><i class="icon icon-arrow-down"></i>&nbsp; Merge</b-button>
                <b-button @click="loopPressed(index, item)" variant="outline-secondary" :pressed="(looping && loopIndex === index)"><i class="icon icon-refresh"></i></b-button>
                <b-button @click="addBlockPressed(index, item)" variant="outline-secondary"><i class="icon icon-plus"></i></b-button>
                <b-button @click="deleteBlockPressed(index, item)" variant="outline-danger"><i class="icon icon-trash"></i></b-button>
              </b-button-group>
            </td>
          </tr>
        </tbody>
      </table>
    </b-col>
  </b-row>
</template>
<style>
table .time {
  max-width: 60px;
}

table .actionButtons {
  width: 160px;
}

table .speaker {
  width: 110px;
}
</style>
<script lang="ts">
import autosize from 'autosize';
import timestampFormat from 'hh-mm-ss';
import { pullAt } from 'lodash';
import abloop from 'videojs-abloop/dist/videojs-abloop.min.js';
import Vue from 'vue';
import { VideoUpload, VideoUploadStorageLink } from '../../../graphql/generated/prisma';
import { LIST_SPEAKERS } from '../constants/graphql.ts';
import VideoPlayer from './VideoPlayer.vue';

window.autosize = autosize;

export default Vue.extend({
  name: 'VideoTranscriptEditor',
  components: {
    VideoPlayer,
  },
  data() {
    return {
      playerTime: 0,
      playerDuration: 0,
      editableTranscript: undefined,
      editedTranscript: undefined,
      newSpeakers: [],
      allSpeakers: [],
      newSpeakerInput: '',
      looping: false,
      loopIndex: 0,
    };
  },
  computed: {
    speakers: {
      get() {
        const allSpeakers = [...this.newSpeakers, ...this.allSpeakers];
        return allSpeakers;
      },
    },
  },
  mounted() {
    this.editableTranscript =  JSON.parse(JSON.stringify(this.videoUpload.metadata.conversations[0].blocks));
  },
  updated() {
    autosize(document.querySelectorAll('textarea'));
  },
  props: {
    videoUpload: Object,
  },
  filters: {
    formatTimestamp(s: number) {
      return timestampFormat.fromS(s, 'mm:ss.sss');
    },
  },
  methods: {
    loopPressed(index, item) {
      if (this.looping && this.loopIndex === index) {
        this.looping = false;
        this.$refs.transcribePlayer.player.abLoopPlugin.disable();

        return;
      }

      if (this.looping === true) {
        this.loopIndex = index;
        this.$refs.transcribePlayer.player.abLoopPlugin.setStart(item.start).setEnd(item.end).enable();
        return;
      }

      this.$refs.transcribePlayer.player.abLoopPlugin.setStart(item.start).setEnd(item.end).enable();
      this.looping = true;
      this.loopIndex = index;
    },
    stopLooping() {
      this.looping = false;
      this.$refs.transcribePlayer.player.abLoopPlugin.disable();
    },
    seekTo(time: number){
      this.$refs.transcribePlayer.player.currentTime(time);
    },
    timeButtonPressed(key: string, change: number, item, index) {
      if (this.playerDuration === 0) {
        return;
      }
      const copy = JSON.parse(JSON.stringify(this.editableTranscript));
      const previous = index > 0 ? copy[index - 1] : false;
      const next = index < copy.length ? copy[index + 1] : false;
      const target = copy[index];

      const targetTime = target[key] + (change);

      if (targetTime < 0) {
        return this.$notify({
          type: 'error',
          title: '0:00 is as low as you can go.',
        });
      }

      if (targetTime > this.playerDuration) {
        debugger;
        return this.$notify({
          type: 'error',
          title: ' Timestamp must be within video\'s duration!',
        });
      }

      if (next && targetTime > next.start) {
        return this.$notify({
          type: 'error',
          title: 'This line cannot overlap the next line.',
        });
      }

      if (previous && targetTime < previous.end) {
        return this.$notify({
          type: 'error',
          title: 'This line cannot overlap the previous line.',
        });
      }

      if (key === 'end' && target.start >= targetTime) {
        return this.$notify({
          type: 'error',
          title: 'End time cannot be before start time.',
        });
      }

      copy[index][key] = targetTime;
      this.editableTranscript = copy;
    },
    mergeDownPressed(item, index) {
      const copy = JSON.parse(JSON.stringify(this.editableTranscript));
      const next = copy[index + 1];
      const target = copy[index];

      target.content = `${target.content.trim()} ${next.content.trim()}`;
      target.end = next.end;
      pullAt(copy, index + 1);

      this.stopLooping();
      this.editableTranscript = copy;

      Vue.nextTick()
        .then(() => {
          autosize.update(document.querySelectorAll('textarea'));
        });
    },
    handleAddSpeakerOk(evt) {
      evt.preventDefault();
      if (!this.newSpeakerInput) {
        return this.$notify({
          type: 'error',
          title: 'You need to provide a name for your speaker!',
        });
      }

      const speakerNameExists = this.speakers.find((speaker) => { return speaker.name === this.newSpeakerInput; });
      if (speakerNameExists !== undefined) {
        return this.$notify({
          type: 'error',
          title: 'It seems like your speaker already exists.',
        });
      }

      if (this.newSpeakerInput.length < 5) {
        return this.$notify({
          type: 'error',
          title: 'Speaker name must be at least 5 characters.',
        });
      }

      this.handleAddSpeakerSubmit();
    },
    handleAddSpeakerSubmit() {
      this.newSpeakers.push({ name: this.newSpeakerInput, id: -1 });
      this.newSpeakerInput = '';
      this.$forceUpdate();
      this.$refs.newSpeakerModal.hide();
    },
    playerTimeUpdated() {
      this.$forceUpdate();
      this.playerTime = this.$refs.transcribePlayer.player.currentTime();
    },
    playerMetadataUpdated() {
      this.playerDuration = this.$refs.transcribePlayer.player.duration();
    },
    getPoster(video: VideoUpload) {
      const storageLink = video.storageLinks.find(link => link.version === 'WEB' && link.fileType === 'THUMBNAIL');
      const linkUrl = `https://storage.googleapis.com/${
        storageLink.bucket
      }/${encodeURI(storageLink.path)}`;
      return linkUrl;
    },
    getSource(storageLink: VideoUploadStorageLink) {
      const linkUrl = `https://storage.googleapis.com/${
        storageLink.bucket
      }/${encodeURI(storageLink.path)}`;
      return [{ src: linkUrl, type: 'video/mp4' }];
    },
    getFirstWebVersion(): VideoUploadStorageLink {
      return this.videoUpload.storageLinks.find(
        (link: VideoUploadStorageLink) => { return link.version === 'WEB' && (link.fileType === 'MP4' || link.fileType === 'WEBM'); });
    },
  },
  apollo: {
    allSpeakers: {
      query: LIST_SPEAKERS,
    },
  },
});
</script>
