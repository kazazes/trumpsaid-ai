<template>
  <b-row class="mb-2">
    <b-col md="6" offset="3" class="mt-3">
      <VideoPlayer id="master" ref="transcribePlayer" :poster="getPoster(videoUpload)" :sources="getSource(getMp4Web())" preload="auto" data-setup="{}" @playerTimeUpdate="playerTimeUpdated" @playerLoaded="playerMetadataUpdated" />
    </b-col>
    <b-col md="12">
      <div class="my-2">
        <b-btn v-b-modal.newSpeakerModal size="sm" class="mx-2" variant="primary" :disabled="editorDisabled">
          <i class="icon icon-plus" />&nbsp;Add Speaker</b-btn>
        <div class="pull-right">
          <b-button-group>
            <b-btn size="sm" variant="primary" :disabled="editorDisabled" @click="handleSaveDraft">Save Draft</b-btn>
            <b-btn size="sm" variant="warning" :disabled="editorDisabled || !draftSaved" @click="handleRestoreDraft">Restore Draft</b-btn>
          </b-button-group>
          <b-btn size="sm" variant="success" class="mr-2" :disabled="editorDisabled" @click="handleSubmitTranscript">
            <i class="icon icon-speech" />&nbsp;Submit Transcript</b-btn>
        </div>
        <b-modal id="newSpeakerModal" ref="newSpeakerModal" size="sm" hide-header centered @ok="handleAddSpeakerOk">
          <form @submit.stop.prevent="handleAddSpeakerSubmit">
            <label for="speakerName">Speaker's name:</label>
            <b-form-input id="speakerName" v-model="newSpeakerInput" type="text" />
          </form>
        </b-modal>
      </div>
    </b-col>
    <b-col md="12">
      <table class="table table-sm mx-2">
        <thead>
          <th class="time">Start</th>
          <th class="time">End</th>
          <th class="speaker">Speaker</th>
          <th>Content</th>
          <th class="actionButtons" />
        </thead>
        <tbody>
          <tr v-for="(item, index) in editableTranscript" :key="index">
            <td class="time">
              <a href="" @click.stop.prevent="seekTo(item.start)">
                {{ item.start | formatTimestamp }}
              </a>
              <b-button-group size="sm" style="width: 100%;" class="my-1">
                <b-btn :disabled="editorDisabled" variant="outline-primary" @click="timeButtonPressed('start', 0.1, item, index)">+0.1</b-btn>
                <b-btn :disabled="editorDisabled" variant="outline-info" @click="timeButtonPressed('start', -0.1, item, index)">-0.1</b-btn>
              </b-button-group>
            </td>
            <td class="time">
              <a href="" @click.stop.prevent="seekTo(item.end)">
                {{ item.end | formatTimestamp }}
              </a>
              <b-button-group size="sm" style="width: 100%;" class="my-1">
                <b-btn :disabled="editorDisabled" variant="outline-primary" @click="timeButtonPressed('end', 0.1, item, index)">+0.1</b-btn>
                <b-btn :disabled="editorDisabled" variant="outline-info" @click="timeButtonPressed('end', -0.1, item, index)">-0.1</b-btn>
              </b-button-group>
            </td>
            <td class="speaker">
              <div class="form-inline mt-2">
                <select v-model="item.speaker" :disabled="editorDisabled" class="form-control form-control-sm">
                  <option v-if="item.speaker" selected>
                    {{ item.speaker.name }}
                  </option>
                  <option v-for="speaker in newSpeakers" :key="speaker.name" :value="speaker">
                    {{ speaker.name }}
                  </option>
                  <option v-for="speaker in allSpeakers" :key="speaker.name" :value="speaker">
                    {{ speaker.name }}
                  </option>
                </select>
              </div>
            </td>
            <td>
              <div class="form-inline mt-2">
                <textarea v-model="item.content" :disabled="editorDisabled" rows="1" class="form-control" style="width: 100%" />
              </div>
            </td>
            <td class="actionButtons">
              <b-button-group size="sm" class="mt-2 mr-3 pull-right">
                <b-button v-if="index < editableTranscript.length - 1" :disabled="editorDisabled" variant="outline-primary" @click="mergeDownPressed(index, item)">
                  <i class="icon icon-arrow-down" />&nbsp; Merge</b-button>
                <b-button variant="outline-secondary" :pressed="(looping && loopIndex === index)" @click="loopPressed(index, item)">
                  <i class="icon icon-refresh" />
                </b-button>
                <b-button :disabled="editorDisabled" variant="outline-secondary" @click="addBlockPressed(index, item)">
                  <i class="icon icon-plus" />
                </b-button>
                <b-button :disabled="editorDisabled" variant="outline-danger" @click="deleteBlockPressed(index, item)">
                  <i class="icon icon-trash" />
                </b-button>
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
  import moment from 'moment';
  import Vue from 'vue';
  import {
    ConversationBlock,
    ConversationBlockCreateInput,
    Speaker,
    VideoUpload,
    VideoUploadStorageLink,
  } from '@trumpsaid/prisma';
  import { CREATE_CONVERSATION, LIST_SPEAKERS } from '../../constants/graphql';
  import VideoPlayer from '../VideoPlayer.vue';
  import Component from 'vue-class-component';

  (window as any).autosize = autosize;

  @Component({
    name: 'VideoTranscriptEditor',
    components: { VideoPlayer },
    props: {
      videoUpload: Object as () => VideoUpload,
    },
    filters: {
      formatTimestamp: (s: number) => {
        return timestampFormat.fromS(s, 'mm:ss.sss');
      },
    },
    apollo: {
      allSpeakers: {
        query: LIST_SPEAKERS,
      },
    },
  })
  export default class VideoTranscriptEditor extends Vue {
    videoUpload: VideoUpload;
    editableTranscript: ConversationBlock[] = [];
    newSpeakers: Speaker[] = [];
    allSpeakers: Speaker[];
    playerTime: number = 0;
    playerDuration: number = 0;
    newSpeakerInput: string = '';
    looping: boolean = false;
    loopIndex: number = 0;
    editorDisabled: boolean = false;

    get speakers() {
      const allSpeakers = [...this.newSpeakers, ...this.allSpeakers];
      return allSpeakers;
    }

    get draftSaved() {
      const draft = localStorage.getItem(
        this.videoUpload.id + '.transcript.draft',
      );
      if (draft && draft.length > 0) {
        return true;
      }
      return false;
    }

    get player() {
      return (this.$refs.transcribePlayer as VideoPlayer).player;
    }

    mounted() {
      const sortedTranscripts = this.videoUpload.metadata.conversations.sort(
        (convoA, convoB) => {
          return (
            moment(convoA.createdAt).milliseconds() -
            moment(convoB.createdAt).milliseconds()
          );
        },
      );

      this.editableTranscript = JSON.parse(
        JSON.stringify(sortedTranscripts[0].blocks),
      );
    }

    updated() {
      autosize(document.querySelectorAll('textarea'));
    }

    handleSaveDraft() {
      try {
        localStorage.setItem(
          this.videoUpload.id + '.transcript.draft',
          JSON.stringify(this.editableTranscript),
        );
      } catch (e) {
        return this.$notify({
          type: 'error',
          title: 'Something went wrong.',
        });
      }

      this.$forceUpdate();

      return this.$notify({
        type: 'success',
        title: 'Saved draft.',
      });
    }
    handleRestoreDraft() {
      const rawDraft = localStorage.getItem(
        this.videoUpload.id + '.transcript.draft',
      );
      this.editableTranscript = JSON.parse(rawDraft);
      Vue.nextTick().then(() => {
        autosize.update(document.querySelectorAll('textarea'));
      });
    }
    async handleSubmitTranscript() {
      const validTranscript = this.validateTranscript();
      if (!validTranscript) {
        return;
      }
      this.editorDisabled = true;
      const copy = JSON.parse(JSON.stringify(this.editableTranscript));

      const blocks: ConversationBlockCreateInput[] = copy.map((block: any) => {
        const speaker = { connect: { name: block.speaker.name } };
        return {
          speaker,
          start: block.start,
          end: block.end,
          content: block.content,
        };
      });

      try {
        await this.$apollo.mutate({
          mutation: CREATE_CONVERSATION,
          variables: {
            blocks,
            videoId: this.videoUpload.id,
          },
        });
      } catch (e) {
        return this.$notify({
          type: 'error',
          title: 'Something went wrong.',
        });
      }

      this.$router.go(0);
    }
    validateTranscript() {
      const noSpeaker = this.editableTranscript.find(
        (block: ConversationBlock) => {
          if (block.speaker === null) {
            return true;
          }

          return false;
        },
      );

      const emptyContent = this.editableTranscript.find(
        (block: ConversationBlock) => {
          if (block.content.trim().length < 1) {
            return true;
          }

          return false;
        },
      );

      if (noSpeaker) {
        this.$notify({
          type: 'error',
          title: 'Please select a speaker for all blocks!',
        });
      }

      if (emptyContent) {
        this.$notify({
          type: 'error',
          title: 'Some of your conversation blocks are empty.',
        });
      }

      if (noSpeaker || emptyContent) {
        return false;
      }
      return true;
    }
    addBlockPressed(index: number, item: any) {
      const next =
        index < this.editableTranscript.length - 1
          ? this.editableTranscript[index + 1]
          : false;
      const target = this.editableTranscript[index];

      // const targetStart = target.end;
      const targetEnd = target.end + 0.1;

      if (next && targetEnd > next.start) {
        return this.$notify({
          type: 'error',
          title: 'You must have at least .1 second free to insert a section.',
        });
      }

      if (targetEnd > this.playerDuration) {
        return this.$notify({
          type: 'error',
          title: 'Not enough room in the track!',
        });
      }

      let copy = JSON.parse(JSON.stringify(this.editableTranscript));
      const insert = {
        content: '',
        speaker: null as any,
        start: target.end,
        end: targetEnd,
      };
      copy = [...copy.slice(0, index + 1), insert, ...copy.slice(index + 1)];
      this.editableTranscript = copy;
    }
    deleteBlockPressed(index: number, item: any) {
      const copy = JSON.parse(JSON.stringify(this.editableTranscript));
      pullAt(copy, index);
      this.editableTranscript = copy;
    }
    loopPressed(index: number, item: any) {
      if (this.looping && this.loopIndex === index) {
        this.looping = false;
        this.player.abLoopPlugin.disable();

        return;
      }

      if (this.looping === true) {
        this.loopIndex = index;
        this.player.abLoopPlugin
          .setStart(item.start)
          .setEnd(item.end)
          .enable();
        return;
      }

      this.player.abLoopPlugin
        .setStart(item.start)
        .setEnd(item.end)
        .enable();
      this.looping = true;
      this.loopIndex = index;
    }
    stopLooping() {
      this.looping = false;
      this.player.abLoopPlugin.disable();
    }
    seekTo(time: number) {
      this.player.currentTime(time);
    }
    timeButtonPressed(key: string, change: number, item: any, index: number) {
      if (this.playerDuration === 0) {
        return;
      }
      const copy = JSON.parse(JSON.stringify(this.editableTranscript));
      const previous = index > 0 ? copy[index - 1] : false;
      const next = index < copy.length ? copy[index + 1] : false;
      const target = copy[index];

      const targetTime = target[key] + change;

      if (targetTime < 0) {
        return this.$notify({
          type: 'error',
          title: '0:00 is as low as you can go.',
        });
      }

      if (targetTime > this.playerDuration) {
        return this.$notify({
          type: 'error',
          title: " Timestamp must be within video's duration!",
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
    }
    mergeDownPressed(index: number, item: any) {
      const copy = JSON.parse(JSON.stringify(this.editableTranscript));
      const next = copy[index + 1];
      const target = copy[index];

      target.content = `${target.content.trim()} ${next.content.trim()}`;
      target.end = next.end;
      pullAt(copy, index + 1);

      this.stopLooping();
      this.editableTranscript = copy;

      Vue.nextTick().then(() => {
        autosize.update(document.querySelectorAll('textarea'));
      });
    }
    handleAddSpeakerOk(evt: any) {
      evt.preventDefault();
      if (!this.newSpeakerInput) {
        return this.$notify({
          type: 'error',
          title: 'You need to provide a name for your speaker!',
        });
      }

      const speakerNameExists = this.speakers.find((speaker: Speaker) => {
        return speaker.name === this.newSpeakerInput;
      });
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
    }
    handleAddSpeakerSubmit() {
      this.newSpeakers.push({ name: this.newSpeakerInput, id: '0' });
      this.newSpeakerInput = '';
      this.$forceUpdate();
      (this.$refs.newSpeakerModal as any).hide();
    }
    playerTimeUpdated() {
      this.$forceUpdate();
      this.playerTime = this.player.currentTime();
    }
    playerMetadataUpdated() {
      this.playerDuration = this.player.duration();
    }
    getPoster(video: VideoUpload) {
      const storageLink = video.storageLinks.find(
        (link) => link.version === 'WEB' && link.fileType === 'THUMBNAIL',
      );
      const linkUrl = `https://storage.googleapis.com/${
        storageLink.bucket
      }/${encodeURI(storageLink.path)}`;
      return linkUrl;
    }
    getSource(storageLink: VideoUploadStorageLink) {
      const linkUrl = `https://storage.googleapis.com/${
        storageLink.bucket
      }/${encodeURI(storageLink.path)}`;
      return [{ src: linkUrl, mimeType: storageLink.mimeType }];
    }
    getMp4Web(): VideoUploadStorageLink {
      return this.videoUpload.storageLinks.find(
        (link: VideoUploadStorageLink) => {
          return link.version === 'WEB' && link.fileType === 'MP4';
        },
      );
    }
  }
</script>
