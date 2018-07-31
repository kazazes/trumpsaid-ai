import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import Vuex from 'vuex';
import AdminApp from './AdminApp.vue';
import './polyfill';
import router from './router/index';

import VueApollo from 'vue-apollo';
import Notifications from 'vue-notification';
// tslint:disable-next-line:variable-name
const VueTimers = require('vue-timers');

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
  uri: '/graphql',
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(Notifications);
Vue.use(VueApollo);
Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(VueTimers);

/* eslint-disable no-new */
new Vue({
  router,
  provide: apolloProvider.provide(),
  el: '#app',
  template: '<AdminApp/>',
  components: {
    AdminApp,
  },
});
