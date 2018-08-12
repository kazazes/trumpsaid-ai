<template>
<b-modal centered id="submitVideoModal" title="Video Submission" @ok="onSubmit" ref="submitVideoModal" :busy="buttonsDisabled">
  <div>
    <b-form>
      <b-form-group id="videoUrlGroup"
                    label="Video URL:"
                    label-for="videoUrl"
                    description="The page which includes the video">
        <b-form-input id="videoUrl"
                      required
                      v-model="videoUrl"
                      placeholder="Enter URL">
        </b-form-input>
      </b-form-group>
    </b-form>
  </div>
</b-modal>
</template>
<script lang="ts">
import { CREATE_VIDEO_UPLOAD } from '../constants/graphql.ts';

export default {
  name: 'VideoSubmitModal',
  data: () => {
    return {
      videoUrl: '',
      buttonsDisabled: false,
    };
  },
  methods: {
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
        this.$refs.submitVideoModal.hide();
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
    },
  },
};
</script>
