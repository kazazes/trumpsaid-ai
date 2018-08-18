<template>
  <div class="embed-responsive embed-responsive-16by9">
    <video
        :id="id"
        class="video-js vjs-default-skin embed-responsive-item"
        controls
        :preload="preload"
        :poster="poster"
        :data-setup="dataSetup">
        <template v-for="source in sources">
          <source v-bind:src="source.src" v-bind:type="source.type"></source>
        </template>
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="http://videojs.com/html5-video-support/" target="_blank">
          supports HTML5 video
        </a>
      </p>
    </video>
  </div>
</template>
<script lang="ts">
import { every } from 'lodash';
import { default as videojs } from 'video.js';
import Vue from 'vue';

(window as any).videojs = videojs;
require('videojs-abloop/dist/videojs-abloop.min.js');

interface IVideoSource {
  src: String;
  type: String;
}

export default Vue.extend({
  name: 'VideoPlayer',
  computed: {
    player: {
      get() {
        return videojs(this.$props.id);
      },
    },
    currentTime: {
      get() {
        if (this.player) {
          return this.player.currentTime();
        }
      },
      set(time: number) {
        if (this.player) {
          this.player.currentTime(time);
        }
      },
    },
  },
  data() { return { }; },
  mounted() {
    const player = videojs(this.$props.id, {
      plugins: {
        abLoopPlugin: {},
      },
    });
    // tslint:disable-next-line:no-this-assignment
    const that = this;
    player.on('loadedmetadata', () => {
      that.$emit('playerLoaded');
    });

    player.on('timeupdate', () => {
      that.$forceUpdate();
      that.$emit('playerTimeUpdate');
    });
  },
  beforeDestroy() {
    this.player.dispose();
  },
  props: {
    sources: {
      type: Array,
      validator: (sources: IVideoSource[]) => {
        return every(sources, (src: IVideoSource) => {
          return src.src !== undefined && src.mimeType !== undefined;
        });
      },
    },
    id: String,
    preload: {
      type: String,
      default: 'auto',
    },
    poster: String,
    dataSetup: {
      type: String,
      default: () => '{}',
    },
  },
});
</script>
<style>
@import "~video.js/dist/video-js.min.css";
</style>
