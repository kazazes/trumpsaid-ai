import Vue from 'vue'
import { ApolloProperty } from 'vue-apollo/types/vue-apollo';
import { VueApolloComponentOption } from 'vue-apollo/types/options';

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types' {
  export interface VueApollo {

  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $apollo: ApolloProperty<any>
    apollo: object
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    apollo?: VueApolloComponentOption<V>;
  }
}
