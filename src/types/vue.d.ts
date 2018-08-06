import Vue from 'vue'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types' {
  export interface VueApollo {

  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $apollo: object
    apollo: object
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    apollo?: object;
  }
}
