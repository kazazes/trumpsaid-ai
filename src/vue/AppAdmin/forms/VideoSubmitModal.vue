<template>
<b-modal centered id="submitVideoModal" title="Video Submission" @ok="onSubmit" ref="submitVideoModal">
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
import gql from "graphql-tag";

export default {
  name: "VideoSubmitModal",
  data: function() {
    return {
      videoUrl: ""
    };
  },
  methods: {
    onSubmit: async function(bvEvt: Event) {
      bvEvt.preventDefault();
      try {
        const result = await this.$apollo.mutate({
          mutation: gql`
            mutation($url: String!) {
              createVideoUpload(url: $url) {
                id
                status
              }
            }
          `,
          variables: {
            url: this.videoUrl
          }
        });

        this.$notify({
          type: "success",
          title: "Video submited",
          text: "Processing will begin shortly"
        });

        this.$refs.submitVideoModal.hide();
      } catch (err) {
        this.$notify({
          type: "error",
          title: "Error submiting video",
          text: err.message
        });
      }
    }
  }
};
</script>
