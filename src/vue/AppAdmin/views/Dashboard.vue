<template>
  <div class="animated fadeIn" />
</template>

<script lang='ts'>
import Vue from 'Vue';
import { Callout } from '@coreui/vue';
import Component from 'vue-class-component';

@Component({
  name: 'dashboard',
  components: { Callout }
})
export default class dashboard extends Vue {
}
</script>

<style>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
</style>
