import Vue from 'vue';
import Router from 'vue-router';

// tslint:disable:variable-name
const DefaultContainer = () => import('../containers/DefaultContainer.vue');

// Views
const Videos = () => import('../views/Videos.vue');
const VideoSubmission = () => import('../views/VideoSubmission.vue');
const VideoSubmissionsTable = () => import('../views/VideoSubmissionsTable.vue');
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
      children: [
        {
          path: '/videos',
          name: 'Videos',
          component: Videos,
          children: [
            {
              path: 'submissions',
              name: 'Submissions',
              component: VideoSubmissions,
              redirect: '/videos/submissions/all',
              children: [
                {
                  path: 'all',
                  name: 'All Submissions',
                  component: VideoSubmissionsTable,
                },
                {
                  path: ':submissionId',
                  name: 'Details',
                  component: VideoSubmission,
                }],
            },
          ],
        },
      ],
    },
  ],
});
