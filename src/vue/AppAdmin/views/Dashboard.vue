<template>
  <div class='animated fadeIn'>
  </div>
</template>

<script lang='ts'>
import { Callout } from '@coreui/vue';

export default {
  name: 'dashboard',
  components: {
    Callout,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
</style>
