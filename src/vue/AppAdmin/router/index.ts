import Vue from 'vue';
import Router from 'vue-router';

// tslint:disable:variable-name
const DefaultContainer = () => import('../containers/DefaultContainer.vue');

// Views
const VideoSubmissions = () => import('../views/VideoSubmissions.vue');

Vue.use(Router);

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/videos/submissions',
      name: 'Home',
      component: DefaultContainer,
    },
    {
      path: '/videos',
      name: 'Videos',
      component: DefaultContainer,
      children: [
        {
          path: 'submissions',
          name: 'Submissions',
          component: VideoSubmissions,
        },
      ],
    },
  ],
});
