<template>
  <router-view>
  </router-view>
</template>

<script lang="ts">
export default {
  name: 'AdminApp',
  mounted: () => {
    const token = getQueryParam('token');
    if (token && token.length > 50) {
      window.localStorage.setItem('access_token', token);
      window.location.replace('/admin');
    }
  },
};

const getQueryParam = (param: string) => {
  location.search
    .substr(1)
    .split('&')
    .some((item) => {
      // tslint:disable-next-line:no-parameter-reassignment
      item.split('=')[0] === param && (param = item.split('=')[1]);
      return true;
    });
  return param;
};
</script>

<style lang="scss">
// CoreUI Icons Set
@import '~@coreui/icons/css/coreui-icons.min.css';
/* Import Font Awesome Icons Set */
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome.scss';
/* Import Simple Line Icons Set */
$simple-line-font-path: '~simple-line-icons/fonts/';
@import '~simple-line-icons/scss/simple-line-icons.scss';
/* Import Flag Icons Set */
@import '~flag-icon-css/css/flag-icon.min.css';
/* Import Bootstrap Vue Styles */
@import '~bootstrap-vue/dist/bootstrap-vue.css';
// Import Main styles for this application
@import 'assets/scss/style';
</style>
