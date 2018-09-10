<template>
  <div class="app">
    <notifications :duration="5000" />
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full mh-100" src="/img/logo.svg" alt="Trump Said... WTF?">
        <img class="navbar-brand-minimized" src="/img/logo.svg" width="30">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdownNotif />
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdownTasks />
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdownMssgs />
        </b-nav-item>
        <DefaultHeaderDropdownAccnt />
      </b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader />
        <SidebarForm />
        <SidebarNav :nav-items="nav" />
        <SidebarFooter />
        <SidebarMinimizer />
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view />
        </div>
      </main>
    </div>
    <TheFooter>
      <span class="mx-auto">
        &copy; Trump Said... WTF? {{ year }}
      </span>
    </TheFooter>
  </div>
</template>

<script lang='ts'>
  import {
    Aside as AppAside,
    AsideToggler,
    Breadcrumb,
    Footer as TheFooter,
    Header as AppHeader,
    Sidebar as AppSidebar,
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNav,
    SidebarToggler,
  } from '@coreui/vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import nav from '../_nav';
  import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt.vue';
  import DefaultHeaderDropdownMssgs from './DefaultHeaderDropdownMssgs.vue';
  import DefaultHeaderDropdownNotif from './DefaultHeaderDropdownNotif.vue';
  import DefaultHeaderDropdownTasks from './DefaultHeaderDropdownTasks.vue';

  @Component({
    name: 'DefaultContainer',
    components: {
      AsideToggler,
      AppHeader,
      AppSidebar,
      AppAside,
      TheFooter,
      Breadcrumb,
      DefaultHeaderDropdownMssgs,
      DefaultHeaderDropdownNotif,
      DefaultHeaderDropdownTasks,
      DefaultHeaderDropdownAccnt,
      SidebarForm,
      SidebarFooter,
      SidebarToggler,
      SidebarHeader,
      SidebarNav,
      SidebarMinimizer,
    },
  })
  export default class DefaultContainer extends Vue {
    public nav = nav.items;
    get name() {
      return this.$route.name;
    }
    get year() {
      return new Date().getFullYear();
    }
    get list() {
      return this.$route.matched.filter((route: any) => {
        return route.name || route.meta.label;
      });
    }
  }
</script>
