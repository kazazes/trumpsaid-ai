import Vue from 'vue';
import Router from 'vue-router';

// tslint:disable:variable-name
const DefaultContainer = require('../containers/DefaultContainer.vue').default;

// Views
const Videos = require('../views/Videos.vue').default;
const VideoSubmission = require('../views/VideoSubmission.vue').default;
const VideoSubmissionsTable = require('../views/VideoSubmissionsTable.vue').default;
const VideoSubmissions = require('../views/VideoSubmissions.vue').default;
const VideoSubmissionReview = require('../views/VideoSubmissionReview.vue').default;

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
                  path: ':submissionId/review',
                  name: 'Review',
                  component: VideoSubmissionReview,
                },
                {
                  path: ':submissionId',
                  name: 'Details',
                  component: VideoSubmission,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
