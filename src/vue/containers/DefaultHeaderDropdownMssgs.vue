<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="icon-envelope-letter"></i>
      <b-badge pill variant="info">{{itemsCount}}</b-badge>
    </template>
    <template slot="dropdown">
      <div class="dropdown-menu-lg">
        <b-dropdown-header tag="div" class="text-center"><strong>You have {{itemsCount}} messages</strong></b-dropdown-header>
        
      </div>
    </template>
  </AppHeaderDropdown>
</template>
<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownMssgs',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 0 }
  }
}
</script>
