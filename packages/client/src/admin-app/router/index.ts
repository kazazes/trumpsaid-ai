
import Router from 'vue-router';

// tslint:disable:variable-name
const DefaultContainer = require('../containers/DefaultContainer.vue').default;

// Views
const Videos = require('../views/Videos.vue').default;
const VideoSubmission = require('../views/VideoSubmission/VideoSubmission.vue').default;
const VideoSubmissionsTable = require('../views/VideoSubmission/VideoSubmissionsTable.vue').default;
const VideoSubmissions = require('../views/VideoSubmission/VideoSubmissions.vue').default;
const VideoSubmissionReview = require('../views/VideoSubmission/VideoSubmissionReview.vue').default;

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
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
