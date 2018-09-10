<template>
  <div class="animated fadeIn" />
</template>

<script lang='ts'>
import { Callout } from '@coreui/vue';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'dashboard',
  components: { Callout }
})
export default class Dashboard extends Vue {
}
</script>

<style>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
</style>
