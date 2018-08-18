<template>
  <b-modal
    id="submitVideoModal"
    ref="submitVideoModal"
    centered
    title="Video Submission"
    :busy="buttonsDisabled"
    @ok="onSubmit"
  >
    <div>
      <b-form>
        <b-form-group
          id="videoUrlGroup"
          label="Video URL:"
          label-for="videoUrl"
          description="The page which includes the video"
        >
          <b-form-input
            id="videoUrl"
            v-model="videoUrl"
            required
            placeholder="Enter URL"
          />
        </b-form-group>
      </b-form>
    </div>
  </b-modal>
</template>
<script lang="ts">
import { CREATE_VIDEO_UPLOAD } from '../constants/graphql';
import Vue from 'Vue';
import Component from 'vue-class-component';

@Component({
  name: 'VideoSubmitModal',
})
export default class VideoSubmitModal extends Vue {
  videoUrl: string = '';
  buttonsDisabled: boolean = false;

  async onSubmit(bvEvt: Event) {
    this.buttonsDisabled = true;
    bvEvt.preventDefault();
    try {
      const result = await this.$apollo.mutate({
        mutation: CREATE_VIDEO_UPLOAD,
        variables: {
          url: this.videoUrl,
        },
      });

      this.$notify({
        type: 'success',
        title: 'Video submited',
        text: 'Video submited succesfully.',
      });

      this.buttonsDisabled = false;
      (this.$refs.submitVideoModal as any).hide();
      this.$router.push({
        path: `/videos/submissions/${result.data.createVideoUpload.id}`,
      });
    } catch (err) {
      this.buttonsDisabled = false;
      this.$notify({
        type: 'error',
        title: 'Error submiting video',
        text: err.message,
      });
    }
  }
}
</script>
