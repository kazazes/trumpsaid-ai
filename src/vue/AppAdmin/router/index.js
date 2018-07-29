import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('../containers/DefaultContainer.vue')

// Views
const Dashboard = () => import('../views/Dashboard.vue')

Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
      ]
    }
  ]
})
