// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import BootstrapVue from 'bootstrap-vue';
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue';
import AdminApp from './AdminApp.vue';
import './polyfill';
import router from './router/index';

// todo
// cssVars()

Vue.use(BootstrapVue);

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import VueApollo from 'vue-apollo';

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql',
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(apolloClient);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<AdminApp/>',
  provide: apolloProvider.provide(),
  components: {
    AdminApp,
  },
});
