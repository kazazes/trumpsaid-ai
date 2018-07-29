// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import BootstrapVue from 'bootstrap-vue';
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue';
import AdminApp from './AdminApp.vue';
import Vuex from 'vuex'
import './polyfill';
import router from './router/index';

Vue.use(BootstrapVue);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    me: {
      avatar: '#',
      displayName: 'Donald Trump'
    }
  },
  mutations: {
    setMe(me) {
      state.me = me;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<AdminApp/>',
  components: {
    AdminApp,
  },
});
